import NProgress from "nprogress"

import type { OnPageTransitionEndAsync } from "vike/types"

export const onPageTransitionEnd: OnPageTransitionEndAsync = async () => {
	NProgress.done()

	NProgress.remove()
}
