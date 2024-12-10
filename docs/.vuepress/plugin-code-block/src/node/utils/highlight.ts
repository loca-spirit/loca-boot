import { createMarkdown } from '@vuepress/markdown'
import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import js from 'shiki/langs/javascript.mjs'
import ts from 'shiki/langs/typescript.mjs'
import html from 'shiki/langs/html.mjs'
import css from 'shiki/langs/css.mjs'
import vue from 'shiki/langs/vue.mjs'
import catppuccinMocha from 'shiki/themes/catppuccin-mocha.mjs'
import materialThemeLighter from 'shiki/themes/material-theme-lighter.mjs'
 
const shiki = createHighlighterCoreSync({
  themes: [catppuccinMocha, materialThemeLighter],
  langs: [js, ts, vue, html, css],
  engine: createJavaScriptRegexEngine()
})

export const highlight = (code: string, lang = 'text', noLineNumbers = true) => {
  return shiki.codeToHtml(code, { lang: lang, themes: { light: 'material-theme-lighter', dark: 'catppuccin-mocha'} })
}

export const markdownText = (text: string) => {
  return createMarkdown().render(text)
}
