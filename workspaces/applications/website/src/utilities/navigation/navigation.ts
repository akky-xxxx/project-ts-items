import { createNavigation } from "next-intl/navigation"

import { routing } from "../../i18n/constants/routing/routing.ts"

export const { Link, usePathname, useRouter } = createNavigation(routing)
