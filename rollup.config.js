export default [
	{
		input: './three-vr-omnitone.js',
		external: ['three'],
		plugins: [
		],
		output: [
			{
				format: 'esm',
				file: 'build/three-vr-omnitone.module.js'
			}
		]
	}
];
