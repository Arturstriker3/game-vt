/// <reference types="vite/client" />

declare module 'vue' {
  export interface GlobalComponents {
    VApp: typeof import('vuetify/components')['VApp']
    VMain: typeof import('vuetify/components')['VMain']
    VBtn: typeof import('vuetify/components')['VBtn']
    VContainer: typeof import('vuetify/components')['VContainer']
    VRow: typeof import('vuetify/components')['VRow']
    VCol: typeof import('vuetify/components')['VCol']
    VCard: typeof import('vuetify/components')['VCard']
    VCardTitle: typeof import('vuetify/components')['VCardTitle']
    VCardText: typeof import('vuetify/components')['VCardText']
    VCardActions: typeof import('vuetify/components')['VCardActions']
    VTextField: typeof import('vuetify/components')['VTextField']
    VCheckbox: typeof import('vuetify/components')['VCheckbox']
    VSlider: typeof import('vuetify/components')['VSlider']
    VDialog: typeof import('vuetify/components')['VDialog']
    VIcon: typeof import('vuetify/components')['VIcon']
    VSpacer: typeof import('vuetify/components')['VSpacer']
    VDivider: typeof import('vuetify/components')['VDivider']
    VAppBar: typeof import('vuetify/components')['VAppBar']
    VAppBarTitle: typeof import('vuetify/components')['VAppBarTitle']
    VFooter: typeof import('vuetify/components')['VFooter']
    VBadge: typeof import('vuetify/components')['VBadge']
    VChip: typeof import('vuetify/components')['VChip']
  }
}
