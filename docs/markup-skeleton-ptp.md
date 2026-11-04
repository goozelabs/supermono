# PTP markup skeleton (tags, ids, classes only; digits normalised to N)

Extracted from scrubbed SingleFile captures. No text, hrefs, or values.
`xN` = N identical siblings collapsed. Only the first sibling's subtree shown.
PTP's own theme is replaced entirely by an external stylesheet: nothing below is pre-styled.

## Shell (every page)

```
body#index
  div#wrapper
    div#header.header
      div.site-logo
        a.site-logo__link
      div#userinfo.user-info-bar
        ul#userinfo_username.user-info-bar__list
          li#nav_userinfo.user-info-bar__item
            a.user-info-bar__link
          li#nav_useredit.user-info-bar__item
            a.user-info-bar__link
          li#nav_logout.user-info-bar__item
            a.user-info-bar__link
        ul#userinfo_major.user-info-bar__list
          li#nav_upload.user-info-bar__item.user-info-bar__link--important
            a.user-info-bar__link
          li#nav_invite.user-info-bar__item.user-info-bar__link--important
            a.user-info-bar__link
          li#nav_bonus.user-info-bar__item.user-info-bar__link--important
            a.user-info-bar__link
          li#nav_donate.user-info-bar__item.user-info-bar__link--important
            a.user-info-bar__link.user-info-bar__link--donations-behind
        ul#userinfo_stats.user-info-bar__list
          li#stats_seeding.user-info-bar__item
            a.user-info-bar__link
            span.user-info-bar__text
          li#stats_leeching.user-info-bar__item
            a.user-info-bar__link
            span.user-info-bar__text
          li#stats_ratio.user-info-bar__item
            a.user-info-bar__link
            span.user-info-bar__text
              span.ratio-N
          li#stats_hnrs.user-info-bar__item x2
            a.user-info-bar__link
            span.user-info-bar__text
        ul#userinfo_minor.user-info-bar__list
          li#nav_inbox.user-info-bar__item
            a.user-info-bar__link
          li#nav_staffinbox.user-info-bar__item
            a.user-info-bar__link
          li#nav_uploaded.user-info-bar__item
            a.user-info-bar__link
          li#nav_bookmarks.user-info-bar__item
            a.user-info-bar__link
          li#nav_notifications.user-info-bar__item
            a.user-info-bar__link
          li#nav_posts.user-info-bar__item
            a.user-info-bar__link
          li#nav_subscriptions.user-info-bar__item
            a.user-info-bar__link
          li#nav_comments.user-info-bar__item
            a.user-info-bar__link
          li#nav_more.user-info-bar__item.user-info-bar__item--drop-down-menu-opener
            a.user-info-bar__link
            ul.user-info-bar__drop-down-menu
              li.user-info-bar__drop-down-menu__item x8
      div.main-menu
        ul.main-menu__list
          li#nav_index.main-menu__item
            a.main-menu__link
          li#nav_torrents.main-menu__item
            a.main-menu__link
          li#nav_collages.main-menu__item
            a.main-menu__link
          li#nav_requests.main-menu__item
            a.main-menu__link
          li#nav_forums.main-menu__item
            a.main-menu__link
          li#nav_irc.main-menu__item
            a.main-menu__link
          li#nav_topN.main-menu__item
            a.main-menu__link
          li#nav_rules.main-menu__item
            a.main-menu__link
          li#nav_wiki.main-menu__item
            a.main-menu__link
          li#nav_staff.main-menu__item
            a.main-menu__link
      div.search-bar
        ul.search-bar__list
          li#searchbar_torrents.search-bar__search-field
            form.search-bar__search-field__form
              input
              input#torrentssearch.search-bar__search-field__input
              ul#torrentscomplete.search-bar__results.hidden
          li#searchbar_people.search-bar__search-field
            form.search-bar__search-field__form
              input#artistsearch.search-bar__search-field__input
              ul#artistcomplete.search-bar__results.hidden
          li#searchbar_collections.search-bar__search-field
            form.search-bar__search-field__form
              input#collectionsearch.search-bar__search-field__input
          li#searchbar_requests.search-bar__search-field
            form.search-bar__search-field__form
              input.search-bar__search-field__input
          li#searchbar_forums.search-bar__search-field
            form.search-bar__search-field__form
              input
              input.search-bar__search-field__input
          li#searchbar_log.search-bar__search-field
            form.search-bar__search-field__form
              input.search-bar__search-field__input
          li#searchbar_users.search-bar__search-field
            form.search-bar__search-field__form
              input
              input.search-bar__search-field__input
    div#content.page__main-content
  div#footer.footer
    div.footer__disclaimer
    p.footer__load
      strong x4
  div#lightbox.lightbox.hidden
  div#lightbox__shroud.lightbox__shroud.hidden
  div#extraN x6
    span
```

## Bonus points (body#bonus)

```
div#content.page__main-content
  h2.page__title
  div.linkbox
    a.linkbox__link x2
  div#bp_send.panel
    div.panel__heading
      span.panel__heading__title
    div.panel__body.form--horizontal
      div.alert.alert--warning
  div#bp_send
    table.table.table--panel-like.table--bordered.table--striped
      thead
        tr
          th x2
      tbody
        tr x9
          td x2
            a
```

## Collections index (body#collages)

```
div#content.page__main-content
  div.thin
    h2.page__title
    div.linkbox
      a.linkbox__link
    div.panel.form--horizontal.search-form
      div.panel__body
        form
          input
          div.grid x5
            div.grid__item.grid-u-N-N x2
          div.search-form__footer
            div.grid
    div.pagination.pagination--top
      span.pagination__current-page
      a.pagination__link.pagination__link--page x8
      a.pagination__link.pagination__link--next
      a.pagination__link.pagination__link--last
    table.table.table--panel-like.table--bordered.table--striped
      thead
        tr
          th x5
            a
      tbody
        tr x25
          td x5
            a
    div.pagination.pagination--bottom
      span.pagination__current-page
      a.pagination__link.pagination__link--page x8
      a.pagination__link.pagination__link--next
      a.pagination__link.pagination__link--last
```

## Browse torrents (body#torrents)

```
div#content.page__main-content
  div.toggleable-search-form
    div#filter_torrents_toggle.toggleable-search-form__toggler-container.clearfix
      a.toggleable-search-form__toggler
      span
        img#browse_settings
    div.toggleable-search-form__search-form
      form#filter_torrents_form
        div.filter_torrents.panel.form--horizontal.search-form.search-form--narrow
          div.panel__body
            div#filter_torrents_typetext_div.search-form__advanced-basic-toggler
            div.grid x2
            div#taglist.grid
            div.grid
            ul.list.list--inline.list--inline-full-width.list--unstyled
            div.search-form__footer.search-form__footer--right-aligned
  div.pagination.pagination--top.js-pagination
    span.pagination__current-page
    a.pagination__link.pagination__link--page x10
    a.pagination__link.pagination__link--next
    a.pagination__link.pagination__link--last
  div#torrents-movie-view
    div
      table.torrent_table.grouping.table.table--panel-like.table--bordered.basic-movie-list
        thead
          tr
            th.small
            th x3
            th.sign x3
        tbody x50
          tr.basic-movie-list__details-row
            td x2
            td.nobr x2
            td
            td.no-seeders
            td
          tr.basic-movie-list__torrent-row x2
            td.basic-movie-list__torrent-edition
  div.pagination.pagination--bottom.js-pagination
    span.pagination__current-page
    a.pagination__link.pagination__link--page x10
    a.pagination__link.pagination__link--next
    a.pagination__link.pagination__link--last
```

## Settings: info (body#user)

```
div#content.page__main-content
  div.thin
    h2.page__title
      a.username
    div.tabs
      div.tabs__bar
        ul.tabs__bar__list
          li.tabs__bar__item
            a.tabs__bar__link
          li.tabs__bar__item.tabs__bar__item--active
            a.tabs__bar__link
          li.tabs__bar__item x3
            a.tabs__bar__link
      div.tabs__panels
        div.tabs__panel.tabs__panel--active
          form#userform
            input x3
            div.panel.panel--no-margin.form--horizontal
```

## Settings: party hat (body#user)

```
div#content.page__main-content
  div.thin
    h2.page__title
      a.username
    div.tabs
      div.tabs__bar
        ul.tabs__bar__list
          li.tabs__bar__item x4
            a.tabs__bar__link
          li.tabs__bar__item.tabs__bar__item--active
            a.tabs__bar__link
      div.tabs__panels
        div.tabs__panel.tabs__panel--active
          div.panel.generic-form
            div.panel__body
```

## Settings: preferences (body#user)

```
div#content.page__main-content
  div.thin
    h2.page__title
      a.username
    div.tabs
      div.tabs__bar
        ul.tabs__bar__list
          li.tabs__bar__item.tabs__bar__item--active
            a.tabs__bar__link
          li.tabs__bar__item x4
            a.tabs__bar__link
      div.tabs__panels
        div.tabs__panel.tabs__panel--active
          form#userform
            input x3
            div.panel.panel--no-margin.form--horizontal
```

## Settings: security (body#user)

```
div#content.page__main-content
  div.thin
    h2.page__title
      a.username
    div.tabs
      div.tabs__bar
        ul.tabs__bar__list
          li.tabs__bar__item x2
            a.tabs__bar__link
          li.tabs__bar__item.tabs__bar__item--active
            a.tabs__bar__link
          li.tabs__bar__item x2
            a.tabs__bar__link
      div.tabs__panels
        div.tabs__panel.tabs__panel--active
          form#userform
            input x3
            div.panel.form--horizontal
            p.text--center
    div#tfa-enable-dialog.hidden
      div#tfa-enable-step-N-panel.panel
        div.panel__heading
          span.panel__heading__title
        div.panel__body
          p x2
            input#tfa-enable-step-N-current-password
      div#tfa-enable-step-N-panel.panel.hidden x3
        div.panel__heading
          span.panel__heading__title
        div.panel__body
          p x2
          div
            div#tfa-enable-step-N-qr-code.hidden
          p x3
    div#tfa-codes-dialog.hidden
      div#tfa-codes-step-N-panel.panel
        div.panel__heading
          span.panel__heading__title
        div.panel__body
          p x2
            input#tfa-codes-step-N-current-password
      div#tfa-codes-step-N-panel.panel.hidden
        div.panel__heading
          span.panel__heading__title
        div.panel__body
          p x3
```

## Settings: stylesheet (body#user)

```
div#content.page__main-content
  div.thin
    h2.page__title
      a.username
    div.tabs
      div.tabs__bar
        ul.tabs__bar__list
          li.tabs__bar__item x3
            a.tabs__bar__link
          li.tabs__bar__item.tabs__bar__item--active
            a.tabs__bar__link
          li.tabs__bar__item
            a.tabs__bar__link
      div.tabs__panels
        div.tabs__panel.tabs__panel--active
          form
            input x3
            div.panel.panel--no-margin.form--horizontal
```

## Seeding list (body#torrents)

```
div#content.page__main-content
  h2.page__title
    a
  div.linkbox
    a.linkbox__link x4
  div.toggleable-search-form
    div#filter_torrents_toggle.toggleable-search-form__toggler-container.clearfix
      a.toggleable-search-form__toggler
      span
        img#browse_settings
    div.toggleable-search-form__search-form
      form#filter_torrents_form
        input x2
        div.filter_torrents.panel.search-form.search-form--toggleable
          div.panel__body
            div.grid x4
            div#taglist.grid
            div.grid x3
            ul.list.list--inline.list--inline-full-width.list--unstyled
            div.search-form__footer.search-form__footer--right-aligned
  div.pagination.pagination--top.js-pagination
    span.pagination__current-page
    a.pagination__link.pagination__link--page x10
    a.pagination__link.pagination__link--next
    a.pagination__link.pagination__link--last
  table.torrent_table.grouping.hidden.table.table--panel-like.table--bordered.basic-movie-list.js-basic-movie-list
    thead
      tr
        th.small
        th x3
          a x3
        th.sign x3
          a
            img
    tbody.js-basic-movie-list__table-body
  div.cover-movie-list__container.cover-movie-list__container--centered
    div.cover-movie-list.js-cover-movie-list
      div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
        a.cover-movie-list__movie__cover-link
        div.cover-movie-list__movie__undercover
          div.cover-movie-list__movie__title-row
            a.cover-movie-list__movie__title
            span.cover-movie-list__movie__year
          div.cover-movie-list__movie__rating-and-tags
            a.cover-movie-list__movie__rating
            span.cover-movie-list__movie__tags
      div
      div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
        a.cover-movie-list__movie__cover-link
        div.cover-movie-list__movie__undercover
          div.cover-movie-list__movie__title-row
            a.cover-movie-list__movie__title
            span.cover-movie-list__movie__year
          div.cover-movie-list__movie__rating-and-tags
            a.cover-movie-list__movie__rating
            span.cover-movie-list__movie__tags
      div
      div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
        a.cover-movie-list__movie__cover-link
        div.cover-movie-list__movie__undercover
          div.cover-movie-list__movie__title-row
            a.cover-movie-list__movie__title
            span.cover-movie-list__movie__year
          div.cover-movie-list__movie__rating-and-tags
            a.cover-movie-list__movie__rating
            span.cover-movie-list__movie__tags
      div
      div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
        a.cover-movie-list__movie__cover-link
        div.cover-movie-list__movie__undercover
          div.cover-movie-list__movie__title-row
            a.cover-movie-list__movie__title
            span.cover-movie-list__movie__year
          div.cover-movie-list__movie__rating-and-tags
            a.cover-movie-list__movie__rating
            span.cover-movie-list__movie__tags
      div
      div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
        a.cover-movie-list__movie__cover-link
        div.cover-movie-list__movie__undercover
          div.cover-movie-list__movie__title-row
            a.cover-movie-list__movie__title
            span.cover-movie-list__movie__year
          div.cover-movie-list__movie__rating-and-tags
            a.cover-movie-list__movie__rating
            span.cover-movie-list__movie__tags
      div
      div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
        a.cover-movie-list__movie__cover-link
        div.cover-movie-list__movie__undercover
          div.cover-movie-list__movie__title-row
            a.cover-movie-list__movie__title
            span.cover-movie-list__movie__year
          div.cover-movie-list__movie__rating-and-tags
            a.cover-movie-list__movie__rating
            span.cover-movie-list__movie__tags
      div
      div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
        a.cover-movie-list__movie__cover-link
        div.cover-movie-list__movie__undercover
          div.cover-movie-list__movie__title-row
            a.cover-movie-list__movie__title
            span.cover-movie-list__movie__year
          div.cover-movie-list__movie__rating-and-tags
            a.cover-movie-list__movie__rating
            span.cover-movie-list__movie__tags
      div
      div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
        a.cover-movie-list__movie__cover-link
        div.cover-movie-list__movie__undercover
          div.cover-movie-list__movie__title-row
            a.cover-movie-list__movie__title
            span.cover-movie-list__movie__year
          div.cover-movie-list__movie__rating-and-tags
            a.cover-movie-list__movie__rating
            span.cover-movie-list__movie__tags
      div
      div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
        a.cover-movie-list__movie__cover-link
        div.cover-movie-list__movie__undercover
          div.cover-movie-list__movie__title-row
            a.cover-movie-list__movie__title
            span.cover-movie-list__movie__year
          div.cover-movie-list__movie__rating-and-tags
            a.cover-movie-list__movie__rating
            span.cover-movie-list__movie__tags
      div
      div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
        a.cover-movie-list__movie__cover-link
        div.cover-movie-list__movie__undercover
          div.cover-movie-list__movie__title-row
            a.cover-movie-list__movie__title
            span.cover-movie-list__movie__year
          div.cover-movie-list__movie__rating-and-tags
            a.cover-movie-list__movie__rating
            span.cover-movie-list__movie__tags
      div
  div.js-huge_view_container.hidden
  div.pagination.pagination--bottom.js-pagination
    span.pagination__current-page
    a.pagination__link.pagination__link--page x10
    a.pagination__link.pagination__link--next
    a.pagination__link.pagination__link--last
```

## User profile (body#user)

```
div#content.page__main-content
  div.thin
    h2.page__title
    div.linkbox
    div.sidebar
      div.panel x5
        div.panel__heading
          span.panel__heading__title
        div.panel__body
          img.sidebar-cover-image
    div.main-column
      div.tabs
        div.tabs__bar
          ul.tabs__bar__list
            li.tabs__bar__item.tabs__bar__item--active
            li.tabs__bar__item x5
        div.tabs__panels
          div#general.tabs__panel.tabs__panel--active
            div.panel
            div#user-view
          div#bp-transfer-history-tab.tabs__panel
            div.panel
          div#bp-purchase-history-tab.tabs__panel
            div.panel
          div#stats.tabs__panel
            div.panel
          div#awards.tabs__panel
            div.panel
          div#ratings.tabs__panel
            div.panel
```

## Create request (body#requests)

```
div#content.page__main-content
  div.thin
    h2.page__title
    div.panel.form--horizontal.generic-form
      div.panel__body
        form#request_form
          input x2
          input#countries
          input#languages
          input#runtime
          div.grid x4
            div.grid__item.grid-u-N-N.grid-offset-u-N-N
          div#autofill_row.grid
            div.grid__item.grid-u-N-N x2
          div.grid x6
            div.grid__item.grid-u-N-N x2
          div.grid.js-RequestRequirementDetail.hidden x4
            div.grid__item.grid-u-N-N x2
          div.grid x4
            div.grid__item.grid-u-N-N x2
          div#voting.grid
            div.grid__item.grid-u-N-N x2
          div.generic-form__footer
            div.grid
```

## Donate (body#donate)

```
div#content.page__main-content
  div.thin
    div.panel x5
      div.panel__heading
        span.panel__heading__title
      div.panel__body
        p x3
          strong
```

## Sub-forum (body#forums)

```
div#content.page__main-content
  div.thin
    h2.page__title
      a
    div.linkbox x2
      a.linkbox__link x2
    div.pagination.pagination--top
      span.pagination__current-page
      a.pagination__link.pagination__link--page x5
      a.pagination__link.pagination__link--next
      a.pagination__link.pagination__link--last
    table.forum_list.table.table--panel-like.table--bordered.table--striped
      thead
        tr
          th x4
      tbody
        tr x50
          td.forum-topic--is-unread-sticky
          td x3
            span.last_topic
            span.last_poster
    div.pagination.pagination--bottom
      span.pagination__current-page
      a.pagination__link.pagination__link--page x5
      a.pagination__link.pagination__link--next
      a.pagination__link.pagination__link--last
    div.linkbox
      a.linkbox__link
```

## Forum index (body#forums)

```
div#content.page__main-content
  div.thin
    h2.page__title
    div.linkbox
      a.linkbox__link x3
    h3.heading.heading--small-bottom-margin
    table.forum_index.table.table--panel-like.table--bordered.table--striped
      thead
        tr
          th x5
      tbody
        tr x4
          td.forum-topic--is-unread
          td x4
            b
    h3.heading.heading--small-bottom-margin
    table.forum_index.table.table--panel-like.table--bordered.table--striped
      thead
        tr
          th x5
      tbody
        tr x4
          td.forum-topic--is-unread
          td x4
            b
    h3.heading.heading--small-bottom-margin
    table.forum_index.table.table--panel-like.table--bordered.table--striped
      thead
        tr
          th x5
      tbody
        tr x6
          td.forum-topic--is-unread
          td x4
            b
    h3.heading.heading--small-bottom-margin
    table.forum_index.table.table--panel-like.table--bordered.table--striped
      thead
        tr
          th x5
      tbody
        tr x8
          td.forum-topic--is-unread
          td x4
            b
    h3.heading.heading--small-bottom-margin
    table.forum_index.table.table--panel-like.table--bordered.table--striped
      thead
        tr
          th x5
      tbody
        tr x5
          td.forum-topic--is-unread
          td x4
            b
    h3.heading.heading--small-bottom-margin
    table.forum_index.table.table--panel-like.table--bordered.table--striped
      thead
        tr
          th x5
      tbody
        tr
          td.forum-topic--is-unread
          td x4
            b
```

## Friends (body#friends)

```
div#content.page__main-content
  div.thin
    h2.page__title
    div.pagination.pagination--top
    div.panel
      div.panel__body
        form
          input
          table.forum_post
            tbody
    div.pagination.pagination--bottom
```

## Wiki article: rules (body#wiki)

```
div#content.page__main-content
  div.thin
    h2.page__title
    div.linkbox
      a.linkbox__link x2
    div.sidebar
      div.panel x2
        div.panel__body
          form
            input x2
            input.hidden
          a
    div.main-column
      div.panel
        div.panel__body
          blockquote
            span.bbcode-size-N
            ul
          div
            span.bbcode-size-N
          a
          strong
            span
          a x2
          strong
            span
          a
          strong
            span
          a
          strong
            span
          a x2
          strong
            span
          a
          strong
            span
          a
          strong
            span
          a
          strong
            span
          a x2
          strong
            span
          a
          strong
            span
          a
          strong
            span
          a
          strong
            span
          a
          strong
            span
          a
          strong
            span
          a
          strong
            span
          a
          strong
            span
          a
          strong
            span
          a x2
          strong
            span
          span.bbcode-size-N
            strong
          ul
            li x3
```

## Wiki article: guide (body#wiki)

```
div#content.page__main-content
  div.thin
    h2.page__title
    div.linkbox
      a.linkbox__link x2
    div.sidebar
      div.panel x2
        div.panel__body
          form
            input x2
            input.hidden
          a
    div.main-column
      div.panel
        div.panel__body
          a
          span.bbcode-size-N
            strong
          a
          strong
          a
          blockquote.hidden.spoiler
            ul x5
          span.bbcode-size-N
            strong
          blockquote
            strong x4
            span
          span.bbcode-size-N
            strong
          span
          strong
          a
          strong
          blockquote
            code.code--copyable
            strong
          code.code--copyable
          blockquote
            strong
            span
            strong
            a
            strong x3
            span
            a
            strong
          span.bbcode-size-N
            strong
          code.code--copyable
          strong
            code.code--copyable
          blockquote
            strong
            em
            a
            strong
            em
            strong
            em
          span.bbcode-size-N
            strong
          code.code--copyable
          strong
            code.code--copyable
          a
          code.code--copyable
          strong
            code.code--copyable
          span.bbcode-size-N x2
            strong
          strong
          a
          blockquote.hidden.spoiler
            img.bbcode__image
            code.code--copyable x2
            img.bbcode__image
            code.code--copyable
            img.bbcode__image
          span.bbcode-size-N
          strong
          a
          blockquote.hidden.spoiler
            img.bbcode__image x3
          span.bbcode-size-N
            strong
          strong
          code.code--copyable
          strong
            code.code--copyable
          code.code--copyable x2
          strong x2
            code.code--copyable
```

## Movie page (body#torrents)

```
div#content.page__main-content
  div.thin
    h2.page__title
      a.artist-info-link
    div.linkbox
      a.linkbox__link x8
    div.sidebar
      div.box_albumart.panel
        div.panel__heading
          span.panel__heading__title
        div.panel__body
          img.sidebar-cover-image
      div#movieinfo.panel
        div.panel__heading
          span.panel__heading__title
        div.panel__body
          div x7
            strong
            a.artist-info-link
          div#certification
            strong
          div x2
            div
            div#akas.hidden
      div.box_tags.panel
        div.panel__heading
          span.panel__heading__title
          span
            a#toggleaddtags
        div.panel__body
          ul.list.list--unstyled
            li x3
      div#addtags.hidden.panel
        div.panel__heading
          span.panel__heading__title
        div.panel__body
          form
            input x5
          strong
            a
      div#connections.panel
        div.panel__heading
          span.panel__heading__title
        div.panel__body
          div
          ul.list.list--small-padding
            li x17
      div#collages.panel
        div.panel__heading
          span.panel__heading__title
          a.panel__heading__toggler
        div#detailsCollections.panel__body
          ul.list.list--unstyled
            li x78
      div#similar_movies.panel
        div.panel__heading
          span.panel__heading__title
          span
            a#toggle_add_similar_movies
        div.panel__body
          div#add_similar_movie.hidden
            form#add_similar_movie_form
            div#add_similar_movie_message.alert.alert--warning.hidden
          ul#similar_movies_list.list.list--unstyled
            li x2
      div#freeleech_pot.panel
        div.panel__heading
          span.panel__heading__title
        div.panel__body
          form#quickpreviewpot
            input x2
            div.form__input
            div#contentpreviewpot
    div.main-column
      table#torrent-table.torrent_table.table.table--panel-like.table--bordered.movie-page__torrent-table
        thead
          tr
            th x2
            th.sign x3
        tbody
          tr.group_torrent
            td.basic-movie-list__torrent-edition
          tr#group_torrent_header_N.group_torrent.group_torrent_header
            td
            td.nobr
            td x3
          tr#torrent_N.torrent_info_row.hidden
            td
          tr#group_torrent_header_N.group_torrent.group_torrent_header
            td
            td.nobr
            td x3
          tr#torrent_N.torrent_info_row.hidden
            td
          tr#group_torrent_header_N.group_torrent.group_torrent_header
            td
            td.nobr
            td x3
          tr#torrent_N.torrent_info_row.hidden
            td
          tr#group_torrent_header_N.group_torrent.group_torrent_header
            td
            td.nobr
            td x3
          tr#torrent_N.torrent_info_row.hidden
            td
          tr.group_torrent
            td.basic-movie-list__torrent-edition
          tr#group_torrent_header_N.group_torrent.group_torrent_header
            td
            td.nobr
            td x3
          tr#torrent_N.torrent_info_row.hidden
            td
          tr#group_torrent_header_N.group_torrent.group_torrent_header
            td
            td.nobr
            td x3
          tr#torrent_N.torrent_info_row.hidden
            td
          tr#group_torrent_header_N.group_torrent.group_torrent_header
            td
            td.nobr
            td x3
          tr#torrent_N.torrent_info_row.hidden
            td
          tr#group_torrent_header_N.group_torrent.group_torrent_header
            td
            td.nobr
            td x3
          tr#torrent_N.torrent_info_row.hidden
            td
          tr#group_torrent_header_N.group_torrent.group_torrent_header
            td
            td.nobr
            td x3
          tr#torrent_N.torrent_info_row.hidden
            td
          tr#group_torrent_header_N.group_torrent.group_torrent_header
            td
            td.nobr
            td x3
          tr#torrent_N.torrent_info_row.hidden
            td
          tr#group_torrent_header_N.group_torrent.group_torrent_header
            td
            td.nobr
            td x3
          tr#torrent_N.torrent_info_row.hidden
            td
          tr.group_torrent
            td.basic-movie-list__torrent-edition
          tr#group_torrent_header_N.group_torrent.group_torrent_header
            td
            td.nobr
            td x3
          tr#torrent_N.torrent_info_row.hidden
            td
          tr#group_torrent_header_N.group_torrent.group_torrent_header
            td
            td.nobr
            td x3
          tr#torrent_N.torrent_info_row.hidden
            td
          tr#group_torrent_header_N.group_torrent.group_torrent_header
            td
            td.nobr
            td x3
          tr#torrent_N.torrent_info_row.hidden
            td
          tr#group_torrent_header_N.group_torrent.group_torrent_header
            td
            td.nobr
            td x3
          tr#torrent_N.torrent_info_row.hidden
            td
          tr#group_torrent_header_N.group_torrent.group_torrent_header
            td
            td.nobr
            td x3
          tr#torrent_N.torrent_info_row.hidden
            td
          tr#group_torrent_header_N.group_torrent.group_torrent_header
            td
            td.nobr
            td x3
          tr#torrent_N.torrent_info_row.hidden
            td
          tr#group_torrent_header_N.group_torrent.group_torrent_header
            td
            td.nobr
            td x3
          tr#torrent_N.torrent_info_row.hidden
            td
          tr.group_torrent
            td.basic-movie-list__torrent-edition
          tr#group_torrent_header_N.group_torrent.group_torrent_header
            td
            td.nobr
            td x3
          tr#torrent_N.torrent_info_row.hidden
            td
          tr#group_torrent_header_N.group_torrent.group_torrent_header
            td
            td.nobr
            td x3
          tr#torrent_N.torrent_info_row.hidden
            td
      div#synopsis-and-trailer.panel
        div.panel__heading
          span.panel__heading__title
        div.panel__body
          div#trailer.movie-page__trailer
            center
          div#synopsis
      div.panel
        div.panel__heading
          span.panel__heading__title
        table#movie-ratings-table
          tbody
            tr
      table.table.table--panel-like.table--bordered.table--striped
        thead
          tr
            th.movie-page__actor-column
            th
        tbody
          tr x10
            td.movie-page__actor-column
            td
          tr.hidden.js-movie-page__actor--secondary x298
            td.movie-page__actor-column
            td
      div.tabs
        div.tabs__bar
          ul.tabs__bar__list
            li.tabs__bar__item.tabs__bar__item--active
            li.tabs__bar__item
        div.tabs__panels
          div#comments-tab.tabs__panel.tabs__panel--active
            div#reply_box.forum-post.forum-post--is-reply
            div#comments-container
          div#related-topics-tab.tabs__panel
            ul.list.list--small-padding
```

## Collection (body#collages)

```
div#content.page__main-content
  div.thin
    h2.page__title
    div.linkbox
      a.linkbox__link
      a#subscribelinkN.linkbox__link
      a.linkbox__link
    div.toggleable-search-form
      div#filter_torrents_toggle.toggleable-search-form__toggler-container.clearfix
        a.toggleable-search-form__toggler
        span
          img#browse_settings
      div.toggleable-search-form__search-form
        form#filter_torrents_form
          input
          div.filter_torrents.panel.search-form.search-form--toggleable
            div.panel__body
    div.sidebar
      div.panel x7
        div.panel__heading
          span.panel__heading__title
        div.panel__body
          a
      h3
      div.panel
        div.panel__heading
          span.panel__heading__title
        div.panel__body
          form#quickpostform
            input x3
            div
            input#post_preview
            input
    div.main-column
      div#ScrollHereOnNewPage.pagination.pagination--top.js-pagination
        span.pagination__current-page
        a.pagination__link.pagination__link--page
        a.pagination__link.pagination__link--next
        a.pagination__link.pagination__link--last
      div#movie-view-container.js-cover-view-index-store
        table.torrent_table.grouping.hidden.table.table--panel-like.table--bordered.basic-movie-list.basic-movie-list--narrow.js-basic-movie-list
          thead
            tr
          tbody.js-basic-movie-list__table-body
        div.cover-movie-list__container.clearfix
          div.cover-movie-list.cover-movie-list--narrow.js-cover-movie-list
            div.cover-movie-list__movie.js-movie-tooltip-triggerer x4
            div
            div.cover-movie-list__movie.js-movie-tooltip-triggerer x4
            div
            div.cover-movie-list__movie.js-movie-tooltip-triggerer x4
            div
            div.cover-movie-list__movie.js-movie-tooltip-triggerer x4
            div
            div.cover-movie-list__movie.js-movie-tooltip-triggerer x4
            div
            div.cover-movie-list__movie.js-movie-tooltip-triggerer x4
            div
            div.cover-movie-list__movie.js-movie-tooltip-triggerer x4
            div
            div.cover-movie-list__movie.js-movie-tooltip-triggerer x4
            div
            div.cover-movie-list__movie.js-movie-tooltip-triggerer x4
            div
            div.cover-movie-list__movie.js-movie-tooltip-triggerer x4
            div
            div.cover-movie-list__movie.js-movie-tooltip-triggerer x4
            div
            div.cover-movie-list__movie.js-movie-tooltip-triggerer x4
            div
            div.cover-movie-list__movie.js-movie-tooltip-triggerer x4
            div
            div.cover-movie-list__movie.js-movie-tooltip-triggerer x4
            div
            div.cover-movie-list__movie.js-movie-tooltip-triggerer x4
            div
        div.small-cover-movie-list__container.js-small-cover-movie-list__container.clearfix.hidden
        div.js-huge_view_container.hidden
      div#no_results_message.panel.hidden
        div.panel__body.text--center
          h2
      div.pagination.pagination--bottom.js-pagination
        span.pagination__current-page
        a.pagination__link.pagination__link--page
        a.pagination__link.pagination__link--next
        a.pagination__link.pagination__link--last
```

## Home (body#index)

```
div#content.page__main-content
  div.thin
    div.sidebar
      div#filmclub.panel
        div.panel__heading
          span.panel__heading__title
            a
          a.panel__heading__toggler
        div#filmclubbody.panel__body
          a.js-movie-tooltip-triggerer.js-cover-view-index-store
            img.sidebar-cover-image
          div.film-club-discuss-link
            a
      div#userrecommended.panel
        div.panel__heading
          span.panel__heading__title
            a
          a.panel__heading__toggler
        div#userrecommended_list.panel__body
          div.user-recommendation x5
            div.user-recommendation__image-container
            div.user-recommendation__body
      table.table.table--panel-like.table--bordered
        thead
          tr
            td
        tbody#contest
          tr x3
            td x2
      div.panel x3
        div.panel__heading
          span.panel__heading__title
          a.panel__heading__toggler
        div#poll.panel__body
          span.poll__title
          div#poll_results
            form#polls
          strong
          a
    div.main-column
      div#lastNt.panel.js-cover-view-index-store
        div.panel__heading
          span#lastN-tab-control.panel__heading__title.tab
            a.simple-tabs__link.simple-tabs__link--active
            a.simple-tabs__link x2
          a.panel__heading__toggler
        div#lastN.lastN-movies.panel__body
          table#lastN_table.lastN-movies__table.table--no-border
            tbody
          table#lastNgp_table.lastN-movies__table.table--no-border.hidden
            tbody
          table#lastNpersonal_table.lastN-movies__table.table--no-border.hidden
            tbody
      table.table.table--panel-like.table--bordered
        thead
          tr
            th
        tbody.js-latest-posts-tbody
          tr x6
            td
      table.table.table--panel-like.table--bordered.hidden
        thead
          tr
            th
        tbody.js-latest-posts-tbody
          tr x6
            td
      div#news
        div#newsN.panel x3
          div.panel__heading
            span.panel__heading__title
            a
            span.time
            a.discuss
          div.panel__body
            div x2
            blockquote
            a
            blockquote
            strong
            a
            strong
            blockquote
            span.spoiler
            a
            strong
            a
            blockquote.hidden.spoiler
            blockquote
            strong x2
            ul
            strong x5
            blockquote
            strong
        a#morenews
          div#getmorenews
```

## Wiki index (body#wiki)

```
div#content.page__main-content
  div.thin
    h2.page__title
    div.linkbox
      a.linkbox__link x2
    div.sidebar
      div.panel x2
        div.panel__body
          form
            input x2
            input.hidden
          a
    div.main-column
      div.panel
        div.panel__body
          blockquote
            div
          a
            strong
          span
            strong
          ul
            li x4
          blockquote
            div
          span
            span.bbcode-size-N
          a x11
          span
            span.bbcode-size-N
          a x7
          span
            span.bbcode-size-N
          a x9
          span
            span.bbcode-size-N
          a x12
          span
            span.bbcode-size-N
          a x4
          span
            span.bbcode-size-N
          a x9
          blockquote
            div
          span
            span.bbcode-size-N
          a x4
          span
            span.bbcode-size-N
          a x6
          span
            span.bbcode-size-N
          a x3
          span
            span.bbcode-size-N
          a x4
          span
            span.bbcode-size-N
          a x4
          span
            span.bbcode-size-N
          a x5
          span
            span.bbcode-size-N
          a x4
          span
            span.bbcode-size-N
          a
          span
            span.bbcode-size-N
          a
```

## Requests (body#requests)

```
div#content.page__main-content
  div.thin
    h2.page__title
    div.linkbox x2
      a.linkbox__link
    div.toggleable-search-form
      div#filter_torrents_toggle.toggleable-search-form__toggler-container.clearfix
        a.toggleable-search-form__toggler
      div.toggleable-search-form__search-form
        div#filter_torrents_form.filter_torrents.panel.form--horizontal.search-form.search-form--toggleable
          div.panel__body
            form#request-search-form
    div.pagination.pagination--top
      span.pagination__current-page
      a.pagination__link.pagination__link--page x10
      a.pagination__link.pagination__link--next
      a.pagination__link.pagination__link--last
    table#request_table.table.table--panel-like.table--bordered.table--striped
      thead
        tr
          th x8
            a x2
      tbody
        tr x25
          td x2
            a.l_movie
            a.artist-info-link
            div.tags
          td#formatted_bounty_N
          td x5
            strong
    div.pagination.pagination--bottom
      span.pagination__current-page
      a.pagination__link.pagination__link--page x10
      a.pagination__link.pagination__link--next
      a.pagination__link.pagination__link--last
```

## Forum thread (body#forums)

```
div#content.page__main-content
  div.thin
    h2.page__title
      a x2
    div.linkbox
      a.linkbox__link x3
    div#searchthread.hidden
      div.panel
        div.panel__body
          form
            input x2
            div.form__group x3
    div.pagination.pagination--top
      span.pagination__current-page
      a.pagination__link.pagination__link--page x4
      a.pagination__link.pagination__link--next
      a.pagination__link.pagination__link--last
    div#postN.forum_post.forum-post.forum-post--unread x25
      div.forum-post__heading
        span
          a.forum-post__id.forum-post__id--staff-post
          strong
            a.username.username--team-leader
            img
          span.user_title
          span.time
          a
        span#barN
          a x2
      div.forum-post__avatar-and-body
        div.forum-post__avatar
          img.forum-post__avatar__image
        div.forum-post__body
          div#contentN.forum-post__bodyguard
            div
            blockquote x2
            a x2
            strong
            blockquote
            strong
            blockquote
            strong
            blockquote
            strong
            blockquote
            strong
            blockquote
            strong
            blockquote
            a x3
            blockquote
            div
            span.bbcode-size-N x3
            a
            blockquote
            strong
            blockquote
            a
            strong
            blockquote
            strong
            a x2
            span.bbcode-size-N
            span
            blockquote
            strong
            blockquote
            a x7
            em
            div.forum-post__edited
    div.pagination.pagination--bottom
      span.pagination__current-page
      a.pagination__link.pagination__link--page x4
      a.pagination__link.pagination__link--next
      a.pagination__link.pagination__link--last
    h2.page__title
      a x2
```

## Top 10 (body#topN)

```
div#content.page__main-content
  h2.page__title
  div.linkbox
    a.linkbox__link.linkbox__link--current
    a.linkbox__link x7
    div.linkbox
      a.linkbox__link
    span
      img#browse_settings
  div.panel.form--horizontal.search-form.search-form--narrow
    div.panel__body
      form
        input
        div.grid x2
          div.grid__item.grid-u-N-N x2
            label.form__label
        div.search-form__footer
          div.grid
            div.grid__item.grid-u-N-N.grid-offset-u-N-N
  h2#top-header-N
    small
      a x2
  div.js-cover-view-index-store
    table.torrent_table.grouping.hidden.table.table--panel-like.table--bordered.basic-movie-list.js-basic-movie-list
      thead
        tr
          th.small
          th x3
          th.sign x3
            img
      tbody.js-basic-movie-list__table-body
    div.cover-movie-list__container.clearfix
      div.cover-movie-list.js-cover-movie-list
        div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
          a.cover-movie-list__movie__cover-link
          div.cover-movie-list__movie__undercover
            div.cover-movie-list__movie__title-row
            div.cover-movie-list__movie__rating-and-tags
        div
        div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
          a.cover-movie-list__movie__cover-link
          div.cover-movie-list__movie__undercover
            div.cover-movie-list__movie__title-row
            div.cover-movie-list__movie__rating-and-tags
        div
    div.small-cover-movie-list__container.js-small-cover-movie-list__container.clearfix.hidden
    div.js-huge_view_container.hidden
  h2#top-header-N
    small
      a x2
  div.js-cover-view-index-store
    table.torrent_table.grouping.hidden.table.table--panel-like.table--bordered.basic-movie-list.js-basic-movie-list
      thead
        tr
          th.small
          th x3
          th.sign x3
            img
      tbody.js-basic-movie-list__table-body
    div.cover-movie-list__container.clearfix
      div.cover-movie-list.js-cover-movie-list
        div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
          a.cover-movie-list__movie__cover-link
          div.cover-movie-list__movie__undercover
            div.cover-movie-list__movie__title-row
            div.cover-movie-list__movie__rating-and-tags
        div
        div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
          a.cover-movie-list__movie__cover-link
          div.cover-movie-list__movie__undercover
            div.cover-movie-list__movie__title-row
            div.cover-movie-list__movie__rating-and-tags
        div
    div.small-cover-movie-list__container.js-small-cover-movie-list__container.clearfix.hidden
    div.js-huge_view_container.hidden
  h2#top-header-N
    small
      a x2
  div.js-cover-view-index-store
    table.torrent_table.grouping.hidden.table.table--panel-like.table--bordered.basic-movie-list.js-basic-movie-list
      thead
        tr
          th.small
          th x3
          th.sign x3
            img
      tbody.js-basic-movie-list__table-body
    div.cover-movie-list__container.clearfix
      div.cover-movie-list.js-cover-movie-list
        div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
          a.cover-movie-list__movie__cover-link
          div.cover-movie-list__movie__undercover
            div.cover-movie-list__movie__title-row
            div.cover-movie-list__movie__rating-and-tags
        div
        div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
          a.cover-movie-list__movie__cover-link
          div.cover-movie-list__movie__undercover
            div.cover-movie-list__movie__title-row
            div.cover-movie-list__movie__rating-and-tags
        div
    div.small-cover-movie-list__container.js-small-cover-movie-list__container.clearfix.hidden
    div.js-huge_view_container.hidden
  h2#top-header-N
    small
      a x2
  div.js-cover-view-index-store
    table.torrent_table.grouping.hidden.table.table--panel-like.table--bordered.basic-movie-list.js-basic-movie-list
      thead
        tr
          th.small
          th x3
          th.sign x3
            img
      tbody.js-basic-movie-list__table-body
    div.cover-movie-list__container.clearfix
      div.cover-movie-list.js-cover-movie-list
        div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
          a.cover-movie-list__movie__cover-link
          div.cover-movie-list__movie__undercover
            div.cover-movie-list__movie__title-row
            div.cover-movie-list__movie__rating-and-tags
        div
        div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
          a.cover-movie-list__movie__cover-link
          div.cover-movie-list__movie__undercover
            div.cover-movie-list__movie__title-row
            div.cover-movie-list__movie__rating-and-tags
        div
    div.small-cover-movie-list__container.js-small-cover-movie-list__container.clearfix.hidden
    div.js-huge_view_container.hidden
  h2#top-header-N
    small
      a x2
  div.js-cover-view-index-store
    table.torrent_table.grouping.hidden.table.table--panel-like.table--bordered.basic-movie-list.js-basic-movie-list
      thead
        tr
          th.small
          th x3
          th.sign x3
            img
      tbody.js-basic-movie-list__table-body
    div.cover-movie-list__container.clearfix
      div.cover-movie-list.js-cover-movie-list
        div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
          a.cover-movie-list__movie__cover-link
          div.cover-movie-list__movie__undercover
            div.cover-movie-list__movie__title-row
            div.cover-movie-list__movie__rating-and-tags
        div
        div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
          a.cover-movie-list__movie__cover-link
          div.cover-movie-list__movie__undercover
            div.cover-movie-list__movie__title-row
            div.cover-movie-list__movie__rating-and-tags
        div
    div.small-cover-movie-list__container.js-small-cover-movie-list__container.clearfix.hidden
    div.js-huge_view_container.hidden
  h2#top-header-N
    small
      a x2
  div.js-cover-view-index-store
    table.torrent_table.grouping.hidden.table.table--panel-like.table--bordered.basic-movie-list.js-basic-movie-list
      thead
        tr
          th.small
          th x3
          th.sign x3
            img
      tbody.js-basic-movie-list__table-body
    div.cover-movie-list__container.clearfix
      div.cover-movie-list.js-cover-movie-list
        div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
          a.cover-movie-list__movie__cover-link
          div.cover-movie-list__movie__undercover
            div.cover-movie-list__movie__title-row
            div.cover-movie-list__movie__rating-and-tags
        div
        div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
          a.cover-movie-list__movie__cover-link
          div.cover-movie-list__movie__undercover
            div.cover-movie-list__movie__title-row
            div.cover-movie-list__movie__rating-and-tags
        div
    div.small-cover-movie-list__container.js-small-cover-movie-list__container.clearfix.hidden
    div.js-huge_view_container.hidden
  h2#top-header-N
    small
      a x2
  div.js-cover-view-index-store
    table.torrent_table.grouping.hidden.table.table--panel-like.table--bordered.basic-movie-list.js-basic-movie-list
      thead
        tr
          th.small
          th x3
          th.sign x3
            img
      tbody.js-basic-movie-list__table-body
    div.cover-movie-list__container.clearfix
      div.cover-movie-list.js-cover-movie-list
        div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
          a.cover-movie-list__movie__cover-link
          div.cover-movie-list__movie__undercover
            div.cover-movie-list__movie__title-row
            div.cover-movie-list__movie__rating-and-tags
        div
        div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
          a.cover-movie-list__movie__cover-link
          div.cover-movie-list__movie__undercover
            div.cover-movie-list__movie__title-row
            div.cover-movie-list__movie__rating-and-tags
        div
    div.small-cover-movie-list__container.js-small-cover-movie-list__container.clearfix.hidden
    div.js-huge_view_container.hidden
  h2#top-header-N
    small
      a x2
  div.js-cover-view-index-store
    table.torrent_table.grouping.hidden.table.table--panel-like.table--bordered.basic-movie-list.js-basic-movie-list
      thead
        tr
          th.small
          th x3
          th.sign x3
            img
      tbody.js-basic-movie-list__table-body
    div.cover-movie-list__container.clearfix
      div.cover-movie-list.js-cover-movie-list
        div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
          a.cover-movie-list__movie__cover-link
          div.cover-movie-list__movie__undercover
            div.cover-movie-list__movie__title-row
            div.cover-movie-list__movie__rating-and-tags
        div
        div.cover-movie-list__movie.js-movie-tooltip-triggerer x5
          a.cover-movie-list__movie__cover-link
          div.cover-movie-list__movie__undercover
            div.cover-movie-list__movie__title-row
            div.cover-movie-list__movie__rating-and-tags
        div
    div.small-cover-movie-list__container.js-small-cover-movie-list__container.clearfix.hidden
    div.js-huge_view_container.hidden
```

## Upload (body#upload)

```
div#content.page__main-content
  div
    h3#dnu_header
    p
    table.table.table--panel-like.table--bordered.table--striped
      thead
        tr
          th.nobr
          th
      tbody
        tr x13
          td.nobr
          td
            a
    div
  div.thin
    div
      p
    p
      input
    div.panel.form--horizontal
      div.panel__body
        form#upload_table
          input
          div.grid
            div.grid__item.grid-u-N-N x2
          div#PieceSizeCalculator.grid.hidden
            div.grid__item.grid-u-N-N x2
            div#piecesizeresults.grid__item.grid-u-N-N
          div.grid x2
            div.grid__item.grid-u-N-N x2
          div#autofill_row.grid
            div.grid__item.grid-u-N-N
            div#autofill-button-container.grid__item.grid-u-N-N
          div.grid x2
            div.grid__item.grid-u-N-N x2
          div#artist_tr.grid
            div.grid__item.grid-u-N-N x2
          div.grid x11
            div.grid__item.grid-u-N-N x2
          div#album_desc_row.grid
            div.grid__item.grid-u-N-N x2
          div#release_desc_row.grid
            div.grid__item.grid-u-N-N x2
          div.grid x4
            div.grid__item.grid-u-N-N x2
          div.generic-form__footer
            div.grid
```

## Request (body#requests)

```
div#content.page__main-content
  div.thin
    h2.page__title
      a
      a.artist-info-link
    div.linkbox
      a.linkbox__link x4
    div.sidebar
      div.panel
        div.panel__heading
          span.panel__heading__title
        div.panel__body
          ul.list.list--unstyled
            li x2
      table.table.table--panel-like.table--bordered
        thead
          tr
            th
        tbody
          tr
            td x2
    div.main-column
      table#request-table.table.table--panel-like.table--bordered
        colgroup
          col x2
        tbody
          tr x10
            td.label.nobr
            td
          tr#voting
            td.label.nobr
            td
          tr
            td.label.nobr
            td
          tr#bounty
            td.label.nobr
            td#formatted_bounty
          tr
            td.label.nobr
            td
      div#comments.pagination.pagination--top
      div.pagination.pagination--bottom
      div#reply_box.forum-post.forum-post--is-reply
        div.forum-post__heading
          span
          span#barpreview
            a
        div.forum-post__avatar-and-body
          div.forum-post__avatar
            img.forum-post__avatar__image
          div.forum-post__body
            div.forum-post__bodyguard
```

