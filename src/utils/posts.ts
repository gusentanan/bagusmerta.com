import { getBlogCollection, getBookMarkCollection } from "./content";

export const getBlogTags = async () => {
	const posts = await getBlogCollection();
	const tags = new Set()
	posts.forEach((post) => {
		post.data.tags.forEach((tag) => {
			tags.add(tag.toLowerCase())
		})
	})

	return Array.from(tags)
}

export const getBlogPostByTag = async (tag) => {
	const posts = await getBlogCollection()
	const lowercaseTag = tag.toLowerCase()
	return posts.filter((post) => {
		return post.data.tags.some((postTag) => postTag.toLowerCase() === lowercaseTag)
	})
}

export const getBookmarkTags = async () => {
	const posts = await getBookMarkCollection();
	const tags = new Set()
	posts.forEach((post) => {
		post.data.tags.forEach((tag) => {
			tags.add(tag.toLowerCase())
		})
	})

	return Array.from(tags)
}

export const getBookmarkByTag = async (tag) => {
	const posts = await getBookMarkCollection()
	const lowercaseTag = tag.toLowerCase()
	const filteredPosts = posts.filter((post) => {
		return post.data.tags.some((postTag) => postTag.toLowerCase() === lowercaseTag)
	})
	filteredPosts.sort((a, b) => b.data.id - a.data.id)
	return filteredPosts
}