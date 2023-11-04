<template>
  <div v-if="tableOptions" class="ctr-table">
    <div v-if="tableOptions.alwaysShowHeader || (tableData && tableData.length > 0)"
      :class="{ 'table-border': tableOptions.noRowBackground && !tableOptions.simpleStyle }">
      <table cellspacing="0" :class="tableOptions.boldHeader ? '' : 'normal-font'" class="table table-hover">
        <thead :class="{ 'simple-header': tableOptions.simpleStyle }"
          v-show="tableOptions.alwaysShowHeader || (tableData && tableData.length > 0)">
          <tr :class="'align-' + (tableOptions.align || 'center')">
            <th v-show="tableOptions.showCheckbox"><input @click="checkAll()" v-model="tableOptions.checkAllState"
                type="checkbox" /></th>
            <th :key="index" :class="(item.click ? 'link-style ' : '') + (item.headerClass ? item.headerClass : '')"
              @click="onHeaderClick(item)" v-for="(item, index) in columns" v-show="!item.hidden">{{ item.headerText }}</th>
            <th v-if="tableOptions.buttonInGroup && tableOptions.buttons?.length">{{ tableOptions.buttonGroupName ||
              operationText }}</th>
            <th v-else :key="index" :class="item.headerClass" v-for="(item, index) in tableOptions.buttons">
              {{ item.headerText }}</th>
          </tr>
        </thead>
        <tbody v-if="tableData && !loading">
          <tr
            :class="['align-' + (tableOptions.align || 'center'), index % 2 === 0 || tableOptions.noRowBackground || tableOptions.simpleStyle ? '' : 'even-row']"
            :key="item.id" v-for="(item, index) in tableData" @click="onRowClick(item)">
            <td v-show="tableOptions.showCheckbox"><input type="checkbox" @click="checkOne(item)"
                v-model="item.checkState" /></td>
            <td :key="header.field" v-for="header in columns" v-show="!header.hidden">
              <div :class="header.rowClass" v-if="header.urlBase && !header.bindHtml && !header.image">
                <a :href="header.urlBase + (header.urlParam ? item[header.urlParam] : '')"
                  :target="header.urlTarget ? header.urlTarget : '_parent'">{{ item[String(header.field)] }}</a>
              </div>
              <div :class="header.rowClass"
                v-if="!header.urlBase && !header.bindHtml && !header.click && (header.format === 'datetime' || header.format === 'date')">
                {{ formatDate(item[String(header.field)], header.format || (header.format === 'date' ? 'yyyy-MM-dd' :
                  'yyyy-MM-dd hh:mm:ss')) }}
              </div>
              <div :class="header.rowClass"
                v-if="!header.urlBase && !header.bindHtml && header.click && header.format !== 'date' && header.format !== 'datetime'">
                <a class="link-button" @click="header.click(item)">{{ (header.maxLength && item[String(header.field)] &&
                  item[String(header.field)].length > header.maxLength) ? item[String(header.field)].substr(0,
                    header.maxLength) + '...' : item[String(header.field)] }}</a>
              </div>
              <div :class="header.rowClass"
                v-if="!header.urlBase && !header.bindHtml && !header.click && !header.image && header.format !== 'date' && header.format !== 'datetime'">
                {{ (header.maxLength && item[String(header.field)] &&
                  item[String(header.field)].length > header.maxLength) ? item[String(header.field)].substr(0,
                    header.maxLength) + '...' : item[String(header.field)] }}
              </div>
              <div :class="header.rowClass" v-if="!header.urlBase && !header.bindHtml && header.image"
                @click="header.click(item)">
                <img :title="item[String(header.tooltip)]" :src="item[String(header.field)]" />
              </div>
              <div :class="header.rowClass" v-if="header.bindHtml" @click="header.click(item)"
                :innerHtml="item[String(header.field)]"></div>
            </td>
            <td v-if="tableOptions.buttonInGroup && tableOptions.buttons?.length" class="button-column">
              <span class="link-button" :key="button.buttonText" v-for="button in tableOptions.buttons"
                @click="button.click && button.click(item)">{{ button.buttonText }}</span>
            </td>
            <td v-else class="button-column" :key="button.buttonText" :class="button.rowClass"
            v-for="button in tableOptions.buttons">
            <span class="link-button" @click="button.click && button.click(item)">{{button.buttonText}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="loading" class="loading">
    <img src="../../assets/images/loading.gif" />
  </div>
  <div v-if="!loading && !tableData?.length" class="no-data">
    {{noData}}
  </div>
</div></template>

<script lang="ts" src="./table.ts"></script>
<style lang="scss" scoped src="./table.scss"></style>
