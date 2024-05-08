// uno.config.ts
import {
	defineConfig,
	transformerCompileClass,
	presetIcons,
	presetUno,
	transformerVariantGroup,
} from "unocss"

export default defineConfig({
	presets: [presetUno(), presetIcons()],
	transformers: [transformerVariantGroup(), transformerCompileClass()],
})
