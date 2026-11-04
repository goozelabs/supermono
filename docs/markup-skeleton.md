# BTN markup skeleton (tags, ids, classes only; digits normalised to N)

Extracted read-only from a logged-in session. No text, hrefs, or values.
`xN` = N identical siblings collapsed. Only the first sibling's subtree shown.

## Shell (every page)

```
div#wrapper
  h1.hidden
  div#header
    div#donation > div > (div#DonBk img, div#DonBr img, div#DonInfo a)
    div#logo > a
    div#userinfo
      ul#userinfo_username > li > a.username ; li.brackets x2 > a
      ul#userinfo_major   > li.brackets x3 > strong > a
      ul#userinfo_stats   > li x4 > span.stat
      ul#userinfo_minor   > li
    div#menu > ul#menuN.potato-menu.potato-menu-group
      li#nav_{index,tv,torrent,community,help,bonus,user}.potato-menu-item
        a
        ul.potato-menu-group > li.potato-menu-item xN > a
    div#alerts > div.alertbar > a, a#del_announce
    div#searchbars > ul > li x6 > (span.hidden, form > input#torrent.lp-disable-search, input.hidden)
  div#ajax_save_message.save_message
  div#ajax_error_message.error_message
  div#content
  div#footer > p x4
  div#lightbox.lightbox
  div#curtain.curtain
  div#extraN x6
```

Body-level overlays injected by JS: `div.jquery-msgbox`, `ul.ui-autocomplete.ui-menu`,
`div#tiptip_holder.tip_* > #tiptip_arrow > #tiptip_arrow_inner, #tiptip_content`.

## Home (`/index.php`)

```
div.thin.home
  div.sidebar
    div.box x6
      div.head.colhead_dark > strong
      div#last_uploads > ul.stats.nobullet > li x2 > center > a > img.toolTip
      div.extrapad > center > a#lastUploadN x5
  div.main_column
    div.box > div#news_post
      div.head > strong, span, a
      div.pad > pre > div > strong > span.sizeN ; a.bbcode_button ; img ; hr ; span ...
      div.extrapad > center > a#loadNewsN x5
    div.of_the_month > div.box x2 > div.head.colhead_dark + ul.stats.nobullet > li x2 > center > a > img.toolTip
    div#N.box > div.head + div.pad > table > tbody > tr x17 > td.center x2 > a x2 > img
    div.box > div.head.colhead_dark + ul.stats.nobullet > div x3 > li x10 > strong
```

## Browse (`/torrents.php`) - flat list, not grouped

```
form
  div.filter_torrents
    h3 > a
    div.box.pad
      table > tbody
        tr x2 > td.label > label ; td > input#searchstr.inputtext, input
        tr.tag_row x4 > td.label ; td > div.tag_container > div.outline x3 > a > i.fa-solid.fa-circle-plus ; a.tag-text ; a > i.fa-solid.fa-circle-minus
        tr x2 > td.label > label ; td > select#order_by > option x7 ; select > option x2
      table.cat_list > tbody > tr > td x2 > input#cat_N, label
      div.country_selection_block > div.country_list > table > tbody > tr x13 > td x7 > input#country_N, label
                                  table.cat_list > tbody > tr > td.label > a.toggle_country_list
      div.submit > span, input x2
    div.box.pad.center > a
div.linkbox > strong, a x12 > strong
table#torrent_table.torrent_table > tbody
  tr.colhead > td.small ; td x4 ; td.sign x3 > a > img
  tr.torrent x50
    td.center x2 > a > img
    td x2 > span > a x2 > img ; a x2 ; abbr ; div.nobr x2 > b, a.permission_N, b
    td.nobr
    td x3
div.linkbox
```

## Series / group (`/series.php`)

```
div.thin
  center > div > h2 > img#banner
  div.linkbox > a x3
  div.sidebar > div.box x12 > div.head > strong ; div > img
  div.main_column
    table#discog_table.torrent_table x12 > tbody x2
      tbody[0] > tr.colhead_dark > td > strong, a.toggle ; td.number ; td.sign x3 > img
      tbody[1] > tr.group_torrent.discog(.first)
        td.group.discog > div > strong > div.year, a.episode      (first row of each episode only)
        td > span > a ; a > span > abbr
        td.nobr.number
        td.number x3                                             (one carries .rN ratio-ish class)
    table.border > tbody > tr.colhead_dark > td > a > strong ; td.nobr > strong ; td x3 > a > strong
                          tr.datatable_rowb.nobr > td
    div.box > div.head > strong
              div#summary > form#edit_summary > input x2
                div#tabs.ui-tabs.ui-tabs-vertical
                  ul.ui-tabs-nav > li.ui-state-default.ui-corner-left x6 > a > img
                  div#{btn,tvdb,imdb,tvrage,tv,wiki}.ui-tabs-panel.ui-widget-content.ui-corner-bottom (+ .ui-tabs-hide)
                    div#X_text ; a ; div#summary_votes_X > a#X_up > img, a#X_down > img
```

## Forum index (`/forums.php`)

```
div.thin > h2 ; div.linkbox > a
  table > tbody
    tr.forum_group_header > td
    tr.colhead > td.read, td.forum_name, td.topics, td.posts, td.last_post
    tr.rowb / tr.rowa (alternating) > td x5 > img
  p ; table ... (repeats per group)
```

## Forum thread (`/forums.php?action=viewthread`)

```
div.thin
  h2 > a x3
  div.linkbox > strong, a x10 > strong
  table#postN.forum_post.box.vertical_margin.forum_unread x25 > tbody
    tr.colhead_dark > td > span x2 > a, strong > a > span.permission_N, img.badge x2 ; span ; a > img
    tr
      td.avatar > img, div.user_details
      td.body > div#contentN.postcontent > pre > div > span.sizeN > strong > u ; em ; a ; s ; img.badge x2 ; span
                span#barN
  div.linkbox
  h3
  div.box.pad > form#quickpostform
    div#quickreplypreview.box
    div#quickreplytext.bbcodetextbox
      input x2
      b.bNh x4                       (legacy rounded-corner spacers)
      div.headh > div.bbcode-btntoolbar > img.bbcode-btn / img.bbcode-sep ... img#colorN
      div.contenth > textarea ...
```

## Notes that drive the CSS

- Browse list is a flat table; group-style rows only appear on `/series.php`.
- BBCode toolbar buttons are `img.bbcode-btn` (images), not icon fonts. Font Awesome only on the tag filter (`i.fa-solid`).
- Forum posts are `table.forum_post` with `td.avatar` + `td.body`: a table-as-layout that needs reflow on narrow screens.
- Menu dropdowns are `ul.potato-menu-group`, opened with `:hover` by `global.css`. Touch needs a `:focus-within` fallback.
- `pre` carries news and post bodies (BBCode output), so it must wrap, not scroll.
