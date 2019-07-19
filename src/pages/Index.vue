<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page>
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg"> -->

    <!-- <section class="content"> -->
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-lg-6 connectedSortable">
          <admin-lte-box-solid
            title="some title"
            id="some id"
          >
            some content
          </admin-lte-box-solid>
        </div>
        <div class="col-xs-12 col-sm-6 col-lg-6 connectedSortable">
          <admin-lte-box-solid
            title="some title2"
            id="some id2"
          >
            some content2
          </admin-lte-box-solid>

        </div>
      </div>
      <div class="row">
        <div class="col-md-3 col-sm-6 col-xs-12 connectedSortable">
          <div class="box box-solid">
            <div class="box-header">
            </div>
          <!-- <admin-lte-box-solid
            title="some title4"
            id="some id4"
          > -->
          <div class="info-box">
            <span class="info-box-icon bg-yellow"><i class="fa fa-files-o"></i></span>

            <div class="info-box-content">
              <span class="info-box-text">Uploads</span>
              <span class="info-box-number">13,648</span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
          <!-- </admin-lte-box-solid> -->
          </div>

        </div>

        <div class="col-xs-12 col-sm-6 col-lg-6 connectedSortable">
          <admin-lte-box-solid
            title="some title3"
            id="some id3"
          >
          <q-card flat bordered class="my-card">
            <q-card-section>
              <div class="text-h6">Our Changing Planet</div>
            </q-card-section>

            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </q-card-section>

            <q-separator inset />

            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </q-card-section>
          </q-card>
          </admin-lte-box-solid>

        </div>
      </div>
    <!-- </section> -->

  </q-page>
</template>

<style>
</style>

<script>

import admin_lte_mixin from '@components/mixins/adminlte'
import AdminLteBoxSolid from '@components/adminlte/boxSolid'

export default {
  mixins: [admin_lte_mixin],

  name: 'PageIndex',
  components: {
    AdminLteBoxSolid
  }
}
</script>
