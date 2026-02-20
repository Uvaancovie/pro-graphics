import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'blogs');

export interface PostData {
    slug: string;
    title: string;
    meta_title: string;
    meta_description: string;
    date: string;
    author: string;
    category: string;
    tags: string[];
    contentHtml?: string;
}

export function getSortedPostsData(): PostData[] {
    // Get file names under /blogs
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const slug = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
            slug,
            ...(matterResult.data as Omit<PostData, 'slug'>),
        };
    });
    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostSlugs() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                slug: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

export async function getPostData(slug: string): Promise<PostData> {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    // Try to find the file from the frontmatter 'slug' field if filename doesn't match
    let fileContents = '';
    try {
        fileContents = fs.readFileSync(fullPath, 'utf8');
    } catch (e) {
        // Fallback: search all files for the slug in frontmatter
        const fileNames = fs.readdirSync(postsDirectory);
        for (const fileName of fileNames) {
            const testPath = path.join(postsDirectory, fileName);
            const testContents = fs.readFileSync(testPath, 'utf8');
            const testMatter = matter(testContents);
            if (testMatter.data.slug === slug) {
                fileContents = testContents;
                break;
            }
        }

        if (!fileContents) {
            throw new Error(`Post not found: ${slug}`);
        }
    }

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const { remark } = await import('remark');
    const html = (await import('remark-html')).default;
    const gfm = (await import('remark-gfm')).default;

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(gfm)
        .use(html, { sanitize: false })
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
        slug,
        contentHtml,
        ...(matterResult.data as Omit<PostData, 'slug' | 'contentHtml'>),
    };
}
