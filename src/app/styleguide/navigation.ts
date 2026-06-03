export interface NavItem {
  name: string
  href: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: "Foundation",
    items: [
      { name: "Design Tokens", href: "/styleguide" },
    ],
  },
  {
    title: "Visual",
    items: [
      { name: "Cores", href: "/styleguide#colors" },
      { name: "Tipografia", href: "/styleguide#typography" },
      { name: "Raios de borda", href: "/styleguide#radius" },
      { name: "Separador", href: "/styleguide#separator" },
    ],
  },
  {
    title: "Formulários",
    items: [
      { name: "Input & Textarea", href: "/styleguide#forms" },
      { name: "Select", href: "/styleguide#forms" },
      { name: "Checkbox & Toggle", href: "/styleguide#forms" },
      { name: "Toggle Group", href: "/styleguide#forms" },
    ],
  },
  {
    title: "Componentes",
    items: [
      { name: "Button", href: "/styleguide#buttons" },
      { name: "Badge", href: "/styleguide#badges" },
      { name: "Alert", href: "/styleguide#alerts" },
      { name: "Card", href: "/styleguide#cards" },
      { name: "Avatar & Skeleton", href: "/styleguide#avatar" },
      { name: "Table", href: "/styleguide#table" },
      { name: "Tabs", href: "/styleguide#tabs" },
      { name: "Accordion", href: "/styleguide#accordion" },
    ],
  },
  {
    title: "Navegação",
    items: [
      { name: "Breadcrumb & Pagination", href: "/styleguide#navigation" },
    ],
  },
  {
    title: "Overlays",
    items: [
      { name: "Dialog & Sheet", href: "/styleguide#overlays" },
      { name: "Tooltip & Popover", href: "/styleguide#overlays" },
      { name: "Calendar", href: "/styleguide#calendar" },
      { name: "Notificações", href: "/styleguide#toasts" },
    ],
  },
]
