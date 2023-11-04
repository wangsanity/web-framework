<template>
  <div class="page-bar">
    <ul class="pagination">
      <li class="xs-hidden page-button" @click="selectPage(1)"><a onclick="this.blur();">&lt;&lt;</a></li><!--
      -->
      <li class="page-button" @click="selectPage(pre)"><a onclick="this.blur();">&lt;</a></li><!--
      -->
      <li class="xs-hidden page-button" v-if="pre2 > 0" @click="selectPage(pre2)"><a onclick="this.blur();">{{ pre2 }}</a>
      </li><!--
      -->
      <li class="page-button" v-if="pre > 0" @click="selectPage(pre)"><a onclick="this.blur();">{{ pre }}</a></li><!--
      -->
      <li class="active page-button"><a @click="selectPage(Number(pageOptions.pageIndex))">{{ pageOptions.pageIndex }}</a>
      </li><!--
      -->
      <li class="page-button" v-if="next <= Number(pageOptions.pageCount)" @click="selectPage(next)"><a
          onclick="this.blur();">{{ next }}</a></li><!--
      -->
      <li class="xs-hidden page-button" v-if="next2 <= Number(pageOptions.pageCount)" @click="selectPage(next2)"><a
          onclick="this.blur();">{{ next2 }}</a></li><!--
      -->
      <li class="page-button" @click="selectPage(next)"><a onclick="this.blur();">&gt;</a></li><!--
      -->
      <li class="xs-hidden page-button" @click="selectPage(Number(pageOptions.pageCount))"><a
          onclick="this.blur();">&gt;&gt;</a>
      </li><!--
      -->
      <li>
        <input v-model="pageNumber" type="number" step="1" class="input-number" @keyup.enter="goPage()" />
        <a class="go-button" @click="goPage()">Go</a>
      </li><!--
      -->
      <li>
        <a>
          <select @change="updatePageSize($event)" v-model="pageOptions.pageSize" class="page-size">
            <option v-for="(pageSize, index) in pageSizes" :key="index" :value='pageSize'>{{ pageSize }}</option>
          </select>
        </a>
      </li><!--
      -->
      <li><span style="padding-left:10px;padding-right:10px;cursor: default;">{{ pageInfo }}</span></li><!--
      -->
      <li class="xs-hidden"><span style="padding-left:10px;padding-right:10px;cursor: default;">{{ itemInfo }}</span></li>
    </ul>
  </div>
</template>

<script lang="ts" src="./page-bar.ts"></script>
<style lang="scss" scoped src="./page-bar.scss"></style>
