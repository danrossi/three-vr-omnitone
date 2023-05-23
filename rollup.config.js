export default [
	{
		input: './three-vr-omnitone.js',
		external: ['three'],
		plugins: [
		],
		output: [
			{
				format: 'esm',
				file: 'build/webgpu-renderer.module.js'
			}
		]
	}
];
