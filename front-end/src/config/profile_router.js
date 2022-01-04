import { AccountCircle, ListAlt, PowerSettingsNew, ShoppingCart } from "@material-ui/icons"


export const profile_routes = [
    {
        name: "Profile",
        path: "/me/profile",
        icon: <AccountCircle />,
        link: true,
    },
    {
        name: "Drafts",
        path: "/me/drafts",
        icon: <ListAlt />,
        link: true,
    },
    {
        name: "Cart",
        path: "/me/carts",
        icon: <ShoppingCart />,
        link: true,
    },
    {
        name: "Sign Out",
        path: "/logout",
        icon: <PowerSettingsNew />,
        link: false,
    }
]

export default profile_routes