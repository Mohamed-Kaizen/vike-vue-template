import NProgress from "nprogress"

import type { OnPageTransitionStartAsync } from "vike/types"

NProgress.configure({
	showSpinner: false,
})

export const onPageTransitionStart: OnPageTransitionStartAsync = async () => {
	NProgress.start()
}
