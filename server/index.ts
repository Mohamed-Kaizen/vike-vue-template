import installCrypto from "@hattip/polyfills/crypto"
import installGetSetCookie from "@hattip/polyfills/get-set-cookie"
import installWhatwgNodeFetch from "@hattip/polyfills/whatwg-node"

import { start_server } from "./serve"

installWhatwgNodeFetch()

installGetSetCookie()

installCrypto()

start_server()
