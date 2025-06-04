import fs from 'fs';
import path from 'path';
import ts from 'typescript';

interface Target {
  folder: string;
  txtPath: string;
}

function findSubfolders(dir: string): Target[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const folder = path.join(dir, d.name);
      const txtPath = path.join(folder, `${d.name}.txt`);
      return { folder, txtPath };
    });
}

function gatherFiles(dir: string, exts = ['.tsx', '.jsx', '.html']): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files: string[] = [];
  for (const entry of entries) {
    const res = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(gatherFiles(res, exts));
    } else if (exts.includes(path.extname(res))) {
      files.push(res);
    }
  }
  return files;
}

function extractStrings(code: string): string[] {
  const source = ts.createSourceFile('temp.tsx', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const texts: Set<string> = new Set();

  function visit(node: ts.Node) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const parent = node.parent;
      if (
        parent &&
        (ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent))
      ) {
        // Skip import/export paths
      } else if (node.text.trim()) {
        texts.add(node.text.trim());
      }
    } else if (ts.isJsxText(node)) {
      const text = node.getText().trim();
      if (text) texts.add(text);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return Array.from(texts);
}

function exportFolder(target: Target) {
  const files = gatherFiles(target.folder);
  const strings: string[] = [];
  for (const file of files) {
    const code = fs.readFileSync(file, 'utf-8');
    strings.push(...extractStrings(code));
  }
  fs.writeFileSync(target.txtPath, strings.join('\n'));
  console.log(`Exported ${strings.length} strings to ${target.txtPath}`);
}

function run() {
  const siteTargets = findSubfolders(path.join('client', 'src', 'site'));
  const pageTargets = findSubfolders(path.join('client', 'src', 'pages'));
  for (const t of [...siteTargets, ...pageTargets]) {
    exportFolder(t);
  }
}

run();
