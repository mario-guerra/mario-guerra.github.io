import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

const learnDirectory = path.join(process.cwd(), 'content/learn');

export interface ProgramMeta {
  title: string;
  slug: string;
  description: string;
  author: string;
  version: string;
  targetAudience: string;
  duration?: string;
  coverImage?: string;
}

export interface ModuleData {
  title: string;
  moduleNumber: number;
  slug: string;
  description: string;
  estimatedTime: string;
  soloCommand: string | null;
  pillar: string | null;
  checkpoint: boolean;
  content: string;
}

// Get metadata for a specific learning program from _meta.json
export function getProgramMeta(programSlug: string): ProgramMeta | null {
  try {
    const fullPath = path.join(learnDirectory, programSlug, '_meta.json');
    if (!fs.existsSync(fullPath)) return null;
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents) as ProgramMeta;
  } catch (error) {
    console.error(`Error loading program meta for ${programSlug}:`, error);
    return null;
  }
}

// Get all modules for a program, sorted by moduleNumber
export function getAllModules(programSlug: string): Omit<ModuleData, 'content'>[] {
  try {
    const programDir = path.join(learnDirectory, programSlug);
    if (!fs.existsSync(programDir)) return [];

    const files = fs.readdirSync(programDir);
    const mdFiles = files.filter(file => file.endsWith('.md'));

    const modules = mdFiles.map(filename => {
      const fullPath = path.join(programDir, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        title: data.title || '',
        moduleNumber: Number(data.moduleNumber) ?? 0,
        slug: data.slug || filename.replace(/\.md$/, ''),
        description: data.description || '',
        estimatedTime: data.estimatedTime || '',
        soloCommand: data.soloCommand || null,
        pillar: data.pillar || null,
        checkpoint: !!data.checkpoint,
      };
    });

    return modules.sort((a, b) => a.moduleNumber - b.moduleNumber);
  } catch (error) {
    console.error(`Error loading modules for ${programSlug}:`, error);
    return [];
  }
}

// Get a single module by program slug and module slug
export async function getModuleBySlug(programSlug: string, moduleSlug: string): Promise<ModuleData | null> {
  try {
    const programDir = path.join(learnDirectory, programSlug);
    if (!fs.existsSync(programDir)) return null;

    const files = fs.readdirSync(programDir);
    const mdFiles = files.filter(file => file.endsWith('.md'));

    // Find the file that has the matching slug inside its frontmatter
    let matchedFile: string | null = null;
    let matchedData: any = null;
    let rawContent: string = '';

    for (const filename of mdFiles) {
      const fullPath = path.join(programDir, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      if (data.slug === moduleSlug) {
        matchedFile = filename;
        matchedData = data;
        rawContent = content;
        break;
      }
    }

    if (!matchedFile) return null;

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeStringify)
      .process(rawContent);

    const contentHtml = processedContent.toString();

    return {
      title: matchedData.title || '',
      moduleNumber: Number(matchedData.moduleNumber) ?? 0,
      slug: matchedData.slug || moduleSlug,
      description: matchedData.description || '',
      estimatedTime: matchedData.estimatedTime || '',
      soloCommand: matchedData.soloCommand || null,
      pillar: matchedData.pillar || null,
      checkpoint: !!matchedData.checkpoint,
      content: contentHtml,
    };
  } catch (error) {
    console.error(`Error loading module ${moduleSlug} for ${programSlug}:`, error);
    return null;
  }
}

// Get list of all learning program slugs (folders containing _meta.json)
export function getProgramSlugs(): string[] {
  try {
    if (!fs.existsSync(learnDirectory)) return [];
    const dirs = fs.readdirSync(learnDirectory);
    return dirs.filter(dir => {
      const isDir = fs.statSync(path.join(learnDirectory, dir)).isDirectory();
      const hasMeta = fs.existsSync(path.join(learnDirectory, dir, '_meta.json'));
      return isDir && hasMeta;
    });
  } catch (error) {
    console.error('Error loading program slugs:', error);
    return [];
  }
}
