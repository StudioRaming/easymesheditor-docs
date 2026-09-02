// Links Easy Mesh Editor terms to the page that explains them.
//
// Cross-links written by hand rot: a term gets renamed in the tool, or a page
// moves, and the prose keeps pointing at the old thing. This plugin owns one
// glossary instead, so a term is defined in exactly one place and every page
// that mentions it links there.
//
// Rules that keep the result readable rather than a wall of blue:
//   - only the FIRST mention of a term on a page becomes a link
//   - never inside headings, code, or an existing link
//   - never a self-link: a page does not link to itself
//   - longest term wins, so "내부 2D 경계" never degrades into "2D 경계"

import path from 'node:path';

// term -> route. Keep terms distinctive; a bare word like "그림자" would match
// everywhere and link nothing useful.
const GLOSSARY = {
  // 세션과 안전 모델
  'Work Mesh': '/internals/session-and-undo#work-mesh',
  '웰드 그룹': '/internals/session-and-undo#웰드-그룹',
  '트랜잭션': '/internals/session-and-undo#트랜잭션',
  '자동 저장': '/internals/session-and-undo#자동-저장과-복원',
  '고아 정점 정리': '/internals/bake#고아-정점-정리',
  'provenance': '/reference/output-files#provenance와-owner',

  // 창
  '단축키 시트': '/guides/window#단축키-시트',
  '컴팩트 모드': '/guides/window#컴팩트-모드',
  '불러올 후보': '/guides/window#불러올-후보',

  // 스컬프트
  '엘라스틱': '/guides/sculpt#엘라스틱',
  '브러시 프리셋': '/guides/sculpt#브러시-프리셋',
  '마스크 모드': '/guides/sculpt#마스크-모드',

  // 편집
  '프로포셔널 편집': '/guides/edit#프로포셔널-편집',
  '모달 변형': '/guides/edit#모달-변형',
  '엣지 루프': '/guides/edit#엣지-루프와-엣지-링',
  '피벗': '/guides/edit#피벗',
  '거리로 병합': '/guides/edit#거리로-병합',

  // 블렌드쉐이프
  '솔로 프리뷰': '/guides/blendshape#솔로-프리뷰',
  '델타 히트맵': '/guides/blendshape#델타-히트맵',
  '미러 키': '/guides/blendshape#미러-키',
  '확장 범위': '/guides/blendshape#확장-범위',
  '적용값 합치기': '/guides/blendshape#적용값-합치기',
  '새 쉐이프로 저장': '/guides/blendshape#빠른-캡처와-bake',

  // 웨이트
  '자동 정규화': '/guides/weight-paint#자동-정규화와-최대-영향-본-수',
  '대칭 페인트': '/guides/weight-paint#대칭-페인트',
  '본 웨이트 합치기': '/guides/weight-paint#본-웨이트-합치기',
  '선택 본 스무딩': '/guides/weight-paint#선택-본-스무딩',
  '가변 본 웨이트': '/internals/bake#가변-본-웨이트',

  // 다중 메쉬
  '활성 대상': '/guides/multi-mesh#활성-대상',
};

const TERMS = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);

// Docs live at the site root (routeBasePath '/'), so the route is the path
// under docs/ with the extension dropped; intro.md owns '/'.
function routeOf(filePath, docsDir) {
  const rel = path
    .relative(docsDir, filePath)
    .split(path.sep)
    .join('/')
    .replace(/\.mdx?$/, '');
  return rel === 'intro' ? '/' : '/' + rel;
}

// An ASCII term must not match inside a longer word: "UV4" should not light up
// inside "UV40". Korean has no such boundary, and needs none.
function boundaryOk(text, start, term) {
  if (!/^[\x20-\x7E]+$/.test(term)) return true;
  const before = text[start - 1];
  const after = text[start + term.length];
  const wordish = /[A-Za-z0-9_]/;
  if (before && wordish.test(before) && /^[A-Za-z0-9_]/.test(term)) return false;
  if (after && wordish.test(after) && /[A-Za-z0-9_]$/.test(term)) return false;
  return true;
}

export default function autoLinkTerms(options = {}) {
  const docsDir = options.docsDir;

  return (tree, file) => {
    const selfRoute = docsDir && file.path ? routeOf(file.path, docsDir) : null;
    const linked = new Set();

    const walk = (node, inSkip) => {
      if (!node || !Array.isArray(node.children)) return;

      // Admonition titles arrive as a paragraph flagged directiveLabel.
      const children = node.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const skip =
          inSkip ||
          child.type === 'heading' ||
          child.type === 'link' ||
          child.type === 'linkReference' ||
          child.type === 'inlineCode' ||
          child.type === 'code' ||
          child.type === 'mdxJsxTextElement' ||
          child.type === 'mdxFlowExpression' ||
          child.type === 'mdxTextExpression' ||
          (child.data && child.data.directiveLabel === true);

        if (child.type === 'text' && !skip) {
          const replacement = linkify(child.value);
          if (replacement) {
            children.splice(i, 1, ...replacement);
            i += replacement.length - 1;
          }
          continue;
        }
        walk(child, skip);
      }
    };

    function linkify(text) {
      const out = [];
      let cursor = 0;

      while (cursor < text.length) {
        let bestIndex = -1;
        let bestTerm = null;

        for (const term of TERMS) {
          if (linked.has(term)) continue;
          // Compare the page, not the anchor: a glossary entry pointing at a
          // section of the current page is still a self-link.
          if (GLOSSARY[term].split('#')[0] === selfRoute) continue;
          const at = text.indexOf(term, cursor);
          if (at < 0) continue;
          if (!boundaryOk(text, at, term)) continue;
          // TERMS is longest-first, so the first hit at the earliest index wins.
          if (bestIndex < 0 || at < bestIndex) {
            bestIndex = at;
            bestTerm = term;
          }
        }

        if (bestIndex < 0) break;

        if (bestIndex > cursor) {
          out.push({type: 'text', value: text.slice(cursor, bestIndex)});
        }
        out.push({
          type: 'link',
          url: GLOSSARY[bestTerm],
          children: [{type: 'text', value: bestTerm}],
          data: {hProperties: {className: 'eme-term'}},
        });
        linked.add(bestTerm);
        cursor = bestIndex + bestTerm.length;
      }

      if (!out.length) return null;
      if (cursor < text.length) {
        out.push({type: 'text', value: text.slice(cursor)});
      }
      return out;
    }

    walk(tree, false);
  };
}
