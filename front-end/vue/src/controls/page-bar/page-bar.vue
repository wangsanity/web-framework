<template>
  <div class="page-bar">
    <ul class="pagination">
      <span class="xs-hidden page-button" @click="selectPage(1)"><a onclick="this.blur();">&lt;&lt;</a></span><!--
      -->
      <span class="page-button" @click="selectPage(pre)"><a onclick="this.blur();">&lt;</a></span><!--
      -->
      <span class="xs-hidden page-button" v-if="pre2 > 0" @click="selectPage(pre2)"><a onclick="this.blur();">{{ pre2 }}</a>
      </span><!--
      -->
      <span class="page-button" v-if="pre > 0" @click="selectPage(pre)"><a onclick="this.blur();">{{ pre }}</a></span><!--
      -->
      <span class="active page-button"><a @click="selectPage(Number(pageOptions.pageIndex))">{{ pageOptions.pageIndex }}</a>
      </span><!--
      -->
      <span class="page-button" v-if="next <= Number(pageOptions.pageCount)" @click="selectPage(next)"><a
          onclick="this.blur();">{{ next }}</a></span><!--
      -->
      <span class="xs-hidden page-button" v-if="next2 <= Number(pageOptions.pageCount)" @click="selectPage(next2)"><a
          onclick="this.blur();">{{ next2 }}</a></span><!--
      -->
      <span class="page-button" @click="selectPage(next)"><a onclick="this.blur();">&gt;</a></span><!--
      -->
      <span class="xs-hidden page-button" @click="selectPage(Number(pageOptions.pageCount))"><a
          onclick="this.blur();">&gt;&gt;</a>
      </span><!--
      -->
      <span>
        <input v-model="pageNumber" type="number" step="1" class="input-number" @keyup.enter="goPage()" />
        <a class="go-button" @click="goPage()">Go</a>
      </span><!--
      -->
      <span>
        <a>
          <select @change="updatePageSize($event)" v-model="pageOptions.pageSize" class="page-size">
            <option v-for="(pageSize, index) in pageSizes" :key="index" :value='pageSize'>{{ pageSize }}</option>
          </select>
        </a>
      </span><!--
      -->
      <span><span style="padding-left:10px;padding-right:10px;cursor: default;">{{ pageInfo }}</span></span><!--
      -->
      <span class="xs-hidden"><span style="padding-left:10px;padding-right:10px;cursor: default;">{{ itemInfo }}</span></span>
    </ul>
  </div>
</template>

<script lang="ts" src="./page-bar.ts"></script>
<style lang="scss" scoped src="./page-bar.scss"></style>
