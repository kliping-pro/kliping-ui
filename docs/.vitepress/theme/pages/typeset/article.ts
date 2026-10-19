import type { ArticleName } from './data'

/**
 * Lima naskah contoh untuk pratinjau, masing-masing mewakili satu jenis
 * permukaan tempat markdown hasil render biasa muncul: dokumentasi, jawaban
 * chat, esai, changelog, dan catatan kerja.
 *
 * Ditulis sebagai HTML polos tanpa satu kelas pun — persis keluaran renderer
 * markdown — karena yang sedang diperlihatkan adalah apa yang dilakukan
 * `typeset.css` pada HTML semacam itu. Isinya statis dan milik situs sendiri,
 * jadi aman di-`v-html`-kan.
 */

const DOCS = `
<h1>Building a Streaming Chatbot</h1>
<p>The <code>useChatStream</code> composable turns a plain API route into a conversational interface. It sends the user's message, reads the response as a stream of chunks, and keeps a reactive list of messages that your template can render as it grows.</p>
<p>Out of the box, the composable gives you:</p>
<ul>
<li><strong>Incremental rendering</strong>: tokens are appended to the last message the moment they arrive, so the answer types itself out instead of appearing all at once.</li>
<li><strong>Request state</strong>: <code>status</code>, <code>error</code> and an <code>abort()</code> function are tracked for you, ready to bind to buttons and spinners.</li>
<li><strong>Bring your own UI</strong>: it returns data, not components. Render the messages with whatever markup your design system already uses.</li>
</ul>
<p>This guide walks through a minimal chat page with real-time streaming. If your assistant needs to call functions, read the <a href="#tools">tool calling guide</a> once you have the basics working.</p>
<h2>Example</h2>
<p>A single round trip looks like this:</p>
<ol>
<li>The user submits the form and <code>send()</code> posts the conversation to <code>/api/chat</code>.</li>
<li>The server route forwards it to your model provider and pipes the response body straight back.</li>
<li>The composable decodes each chunk with a <code>TextDecoder</code> and appends it to the assistant's message.</li>
</ol>
<pre><code>&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { useChatStream } from '@/composables/use-chat-stream'

const input = ref('')
const { messages, send, status } = useChatStream({ api: '/api/chat' })

function submit() {
  send(input.value)
  input.value = ''
}
&lt;/script&gt;

&lt;template&gt;
  &lt;ChatMessage v-for="m in messages" :key="m.id" :message="m" /&gt;
  &lt;form @submit.prevent="submit"&gt;
    &lt;input v-model="input" :disabled="status === 'streaming'" /&gt;
  &lt;/form&gt;
&lt;/template&gt;</code></pre>
<p>On the server, the route does nothing more than relay the stream:</p>
<pre><code>// server/api/chat.post.ts
export default defineEventHandler(async (event) =&gt; {
  const { messages } = await readBody(event)

  const upstream = await fetch(process.env.MODEL_URL!, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ messages, stream: true }),
  })

  return sendStream(event, upstream.body!)
})</code></pre>
<blockquote><p><strong>Note:</strong> keep the provider key on the server. The browser only ever talks to your own route, never to the model provider directly.</p></blockquote>
<h2>Options</h2>
<table>
<thead>
<tr><th>Option</th><th>Type</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code>api</code></td><td><code>string</code></td><td>The endpoint that receives the conversation. Defaults to <code>/api/chat</code>.</td></tr>
<tr><td><code>initial</code></td><td><code>Message[]</code></td><td>Messages to show before the first request, such as a greeting.</td></tr>
<tr><td><code>onFinish</code></td><td><code>(m: Message) =&gt; void</code></td><td>Called once the stream closes, with the completed message.</td></tr>
</tbody>
</table>
<h3>Cancelling a response</h3>
<p>Long answers are easy to regret. Call <code>abort()</code> to close the connection; whatever text has already arrived stays in the message, and <code>status</code> returns to <code>idle</code>.</p>
<hr>
<h2 id="tools">Next steps</h2>
<p>With streaming in place, the natural next step is persistence. Store each finished message in <code>onFinish</code>, and pass the stored list back as <code>initial</code> when the page loads.</p>
`

const CHAT_QUESTION_TEXT = 'Our Vue app feels sluggish when a list has a few thousand rows. Where should I start looking?'

const CHAT = `
<p>A few thousand rows is right around where Vue stops being forgiving. The good news is that the cause is usually one of three things, and each is quick to confirm.</p>
<h3>1. Measure before changing anything</h3>
<p>Open the Vue DevTools <strong>Performance</strong> tab, start recording, and scroll the list. You are looking for two numbers:</p>
<ul>
<li><strong>Render time per update</strong>: how long the component takes to re-render when one row changes.</li>
<li><strong>Number of components</strong>: if every row is a component with several children, the count grows quickly.</li>
</ul>
<h3>2. Check the usual suspects</h3>
<table>
<thead>
<tr><th>Symptom</th><th>Likely cause</th></tr>
</thead>
<tbody>
<tr><td>Slow on first paint</td><td>Rendering every row, even the ones off screen</td></tr>
<tr><td>Slow when one row changes</td><td>A deep <code>reactive()</code> array, or a <code>:key</code> that is not stable</td></tr>
<tr><td>Slow while typing in a filter</td><td>A <code>computed</code> that sorts and filters on every keystroke</td></tr>
</tbody>
</table>
<p>The first one is the most common. If you render all rows, the browser lays out all of them, whether anyone sees them or not.</p>
<h3>3. Fix the biggest one first</h3>
<p>Virtualize the list so only the visible rows exist in the DOM:</p>
<pre><code>const { list, containerProps, wrapperProps } = useVirtualList(rows, {
  itemHeight: 40,
})</code></pre>
<p>Then make the data cheaper to track. Rows you only read can live in a <code>shallowRef</code>, which tells Vue not to walk every nested property:</p>
<pre><code>const rows = shallowRef&lt;Row[]&gt;(await fetchRows())</code></pre>
<p>Re-run the recording after each change. If render time drops but scrolling still stutters, the bottleneck has moved to CSS, which is a different conversation.</p>
<p>Want me to look at the row component itself? Paste its template and I can point out what re-renders on every update.</p>
`

const ARTICLE = `
<h1>The Quiet Craft of Spacing</h1>
<p><em>Why the space between things matters more than the things themselves.</em></p>
<p>Ask a designer what makes a page feel finished and you will rarely hear about fonts. You will hear about rhythm: the steady, almost musical spacing that lets an eye move from a heading to its first paragraph without stumbling.</p>
<p>Most of us learned typography as a list of properties. Font size. Line height. Margins. We set each one in isolation, tuned it until it looked right on one screen, and moved on. The result is a page that works, but never quite settles.</p>
<h2>Rhythm is a relationship</h2>
<p>The insight that changed how I write CSS is simple: spacing values should be related to each other. When the gap between paragraphs is derived from the size of the text, and the gap above a heading is derived from the gap between paragraphs, the whole page scales as one piece.</p>
<blockquote><p>Good spacing is invisible. You only notice it when someone gets it wrong.</p></blockquote>
<p>That is the whole philosophy behind a small set of controls. Pick a size, a leading, and a flow. Everything else, from list indents to the space around a horizontal rule, follows.</p>
<h2>Three numbers, one voice</h2>
<p>Consider what each control is really answering:</p>
<ol>
<li><strong>Size</strong> asks how loudly the text speaks.</li>
<li><strong>Leading</strong> asks how much breath each line takes.</li>
<li><strong>Flow</strong> asks how long the pause is between ideas.</li>
</ol>
<p>Change one and the others still make sense. Change the context, from a dense chat bubble to a roomy long-form article, and a different set of three numbers carries the same voice into a new room.</p>
<figure>
<img src="/placeholder.svg" alt="A placeholder illustration">
<figcaption>Space is a material. Treat it like one.</figcaption>
</figure>
<p>None of this is new. Book designers have worked this way for centuries. What is new is that our pages are no longer fixed: they stream in, resize, and live inside containers we never planned for. A system of relationships survives that. A list of hand-tuned values does not.</p>
`

const CHANGELOG = `
<h1>Changelog</h1>
<p>New releases and improvements, newest first. Breaking changes are called out at the top of each entry.</p>
<h2>v2.4.0</h2>
<p><strong>October 2026</strong></p>
<h3>Added</h3>
<ul>
<li>A <code>size</code> prop on <code>Calendar</code>, with <code>sm</code> and <code>lg</code> presets.</li>
<li>Keyboard shortcuts in <code>DataTable</code>: <kbd>J</kbd> and <kbd>K</kbd> move between rows.</li>
<li>Right-to-left support for <code>Sidebar</code>, including the collapsed icon rail.</li>
</ul>
<h3>Fixed</h3>
<ul>
<li><code>Select</code> no longer scrolls the page when it opens near the bottom of the viewport.</li>
<li>Focus is returned to the trigger after closing a <code>Sheet</code> with <kbd>Esc</kbd>.</li>
</ul>
<h2>v2.3.0</h2>
<p><strong>September 2026</strong></p>
<blockquote><p><strong>Breaking:</strong> the <code>variant="subtle"</code> option on <code>Badge</code> was renamed to <code>variant="secondary"</code>. Run the codemod below to update your project.</p></blockquote>
<pre><code>npx @acme/ui migrate badge-variants</code></pre>
<h3>Changed</h3>
<ul>
<li>Charts now read their colors from <code>--chart-1</code> through <code>--chart-5</code>, so they follow your theme without extra config.</li>
<li>The default radius moved from <code>0.625rem</code> to <code>0.75rem</code>.</li>
</ul>
<h2>v2.2.1</h2>
<p><strong>August 2026</strong></p>
<p>A patch release. The <code>Combobox</code> input now keeps its value when the list is filtered to zero results, and the <code>Drawer</code> handle has a larger touch target on mobile.</p>
`

const NOTES = `
<h1>Search Migration: Working Notes</h1>
<p>Running notes for moving site search from the hosted service to a local index. Updated as we go; decisions are in bold.</p>
<h2>Goals</h2>
<ul>
<li>Search works offline and on preview deployments.</li>
<li>No third-party script on page load.</li>
<li>Results in under 50ms for a typical query on a mid-range phone.</li>
</ul>
<h2>Findings so far</h2>
<p>The full index for 1,400 pages is about 900 KB uncompressed and 180 KB gzipped. That is too large to load up front, but fine to fetch the first time someone opens the search dialog.</p>
<ul>
<li><strong>Decision: load the index lazily</strong>, on the first focus of the search input rather than on page load.</li>
<li>Tokenizing code blocks made the index 40% larger and the results worse. <strong>Decision: index headings and prose only.</strong></li>
<li>Still open: whether to split the index per section so the Components page only downloads component entries.</li>
</ul>
<h2>Checklist</h2>
<ol>
<li>Generate the index at build time from the rendered pages.</li>
<li>Replace the hosted widget with the local dialog.</li>
<li>Keep the <kbd>Ctrl</kbd> <kbd>K</kbd> shortcut and the result layout unchanged.</li>
<li>Remove the old environment variables from the deploy settings.</li>
</ol>
<h3>Snippet to remember</h3>
<pre><code>const index = await fetch('/search-index.json').then(r =&gt; r.json())
const results = search(index, query, { limit: 8, prefix: true })</code></pre>
<hr>
<p>Next sync: compare relevance against the hosted service on the twenty most common queries from last month.</p>
`

export const ARTICLES: Record<ArticleName, string> = {
  docs: DOCS,
  chat: CHAT,
  article: ARTICLE,
  changelog: CHANGELOG,
  notes: NOTES,
}

/** Gelembung pertanyaan pengguna adalah chrome halaman, di luar container typeset. */
export const CHAT_QUESTION = CHAT_QUESTION_TEXT
