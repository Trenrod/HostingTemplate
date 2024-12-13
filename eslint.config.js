module.exports = (async function config() {
	const { default: love } = await import('eslint-config-love')

	return [
		{
			...love,
			files: ['**/*.ts'],
			ignores: ["eslint.config.js", "coverage"]
		},
	]
})()