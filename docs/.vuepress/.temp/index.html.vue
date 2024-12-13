<template><div><h1 id="loca" tabindex="-1"><a class="header-anchor" href="#loca"><span>loca</span></a></h1>
<h2 id="init" tabindex="-1"><a class="header-anchor" href="#init"><span>init</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">yarn</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 高版本暂时会导致发包失败，这个版本目前比较稳定。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">yarn</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> global</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> add</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> lerna@3.22.1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="打包" tabindex="-1"><a class="header-anchor" href="#打包"><span>打包</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># build</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">yarn</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pkgs</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> boot</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># publish</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">yarn</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pub</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> boot</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 更新版本号</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">yarn</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> v</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> boot</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="modelbase" tabindex="-1"><a class="header-anchor" href="#modelbase"><span>ModelBase</span></a></h1>
<h2 id="links" tabindex="-1"><a class="header-anchor" href="#links"><span>Links</span></a></h2>
<ul>
<li><a href="#what-is-model-base">What is ModelBase</a></li>
<li><a href="#installation">Installation</a></li>
<li><a href="#methods">Methods</a>
<ul>
<li><a href="#createModel">createModel</a></li>
</ul>
</li>
</ul>
<h3 id="what-is-modelbase" tabindex="-1"><a class="header-anchor" href="#what-is-modelbase"><span>What is ModelBase</span></a></h3>
<h4 id="设计初衷" tabindex="-1"><a class="header-anchor" href="#设计初衷"><span>设计初衷</span></a></h4>
<p>ModelBase诞生于2017年，是一个被后端团队不断锤炼出来的一个小工具，目标是想一行代码来解决前端处理数据的痛苦的方式。</p>
<h5 id="痛苦点" tabindex="-1"><a class="header-anchor" href="#痛苦点"><span>痛苦点</span></a></h5>
<ul>
<li>前端需要将后端接口数据的key递归转换为驼峰命名的key。</li>
<li>代码的静态类型检查的需求，interface和class的取舍，我们因为要复用模型，所以采用了class。</li>
<li>因为vue2的特殊机制，如果我们不提前定义好对象的key，那么这个对象是无法进行响应式的，我们如果提前定义好key，也要重复写大量的对象。</li>
<li>我们提交数据的时候有的时候需要全量提交，但是又有很多场景都是增量提交（包括变化提交，增 了什么，删了什么，改了什么），而且类似空字符、null不允许提交。</li>
</ul>
<p>等等，这些痛点促成了<code v-pre>ModelBase</code>的诞生。</p>
<h4 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念"><span>基本概念</span></a></h4>
<ul>
<li><code v-pre>ModelBase</code>实例
<ul>
<li>指的是自定义class继承<code v-pre>ModelBase</code>后，通过new创建的实例，该实例具有ModelBase原型所有的方法。</li>
</ul>
</li>
<li><code v-pre>input流向数据</code>（后端给前端的数据）
<ul>
<li>一般指后端返回给前端的数据，在<code v-pre>ModelBase</code>里面指的是new <code v-pre>ModelBase</code>(input)。</li>
</ul>
</li>
<li><code v-pre>output流向数据</code>（前端给后端的数据）
<ul>
<li>一般指的是前端提交给后端，在<code v-pre>ModelBase</code>里面指的是调用<code v-pre>getChangedData</code>、<code v-pre>getSerializableObject</code>、<code v-pre>getSerializableStr</code>、
<code v-pre>getCleanSerializableObject</code>、<code v-pre>getCleanSerializableString</code>、<code v-pre>getChangedDescriptor</code>等方法获取的数据。</li>
</ul>
</li>
</ul>
<h3 id="createmodel" tabindex="-1"><a class="header-anchor" href="#createmodel"><span>createModel</span></a></h3>
<p><code v-pre>createModel</code>方法会自动将普通的JSON对象变为<code v-pre>Consumer</code> 的class实例对象。</p>
<p><code v-pre>createModel</code>会校验JSON数据的key必须和<code v-pre>Consumer</code>的可以保持一致，默认同时支持驼峰和下划线的key。</p>
<div class="language-typescript line-numbers-mode" data-highlighter="shiki" data-ext="typescript" data-title="typescript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">createModel</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'loca-boot-core'</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Consumer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> './model/Consumer'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> model</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> createModel</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">Consumer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    id</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    userName</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'mengyubo'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">expect</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">model</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">toBe</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">expect</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">model</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">userName</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">toBe</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'mengyubo'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


