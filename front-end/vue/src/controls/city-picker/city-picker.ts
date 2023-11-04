/**
 * Name：City picker
 * Description: choose province, city and area,
 *  will improve to support different levels.
 */

import { TextService } from '@/utils';
import { Provinces, Cities, Areas } from './data';
import { defineComponent } from 'vue';

interface Province {
  name: string;
  code: string;
}

interface City {
  name: string;
  code: string;
  provinceCode: string;
}

interface Area {
  name: string;
  code: string;
  provinceCode?: string;
  cityCode?: string;
}

export interface CityPickerResult {
  province?: Province;
  city?: City;
  area?: Area;
}

export default defineComponent({
  props: {
    /**
     * format: vertical-horizontal. e.g. top-left
     */
    position: {},
    title: {
      type: String
    },
    cancelButtonText: {
      type: String
    },
    confirmButtonText: {
      type: String
    },
    fullCode: {
      default: ''
    },
    /**
     * if true toolbar will be hidden, after selecting area will close it automatically
     */
    autoClose: {
      type: Boolean,
      default: true
    },
    width: {
      default: ''
    }
  },
  data() {
    return {
      styles: {} as { [key: string]: string | number },
      displayPopup: false,
      allProvinces: Provinces as Province[],
      allCityies: Cities as City[],
      allAreas: Areas as Area[],
      currentCities: [] as City[],
      currentAreas: [] as Province[],
      innerProvince: '',
      innerCity: '',
      innerArea: '',
      innerProvinceCode: '',
      innerCityCode: '',
      innerAreaCode: '',
      currentProvince: null as Province | null,
      currentCity: null as City | null,
      currentArea: null as Area | null,
      citySlotId: 'city-slot-wrapper-' + new Date().getTime(),
      controls: TextService.controls
    };
  },
  created() {
    this.updatePosition();

    this.setCodes();
    this.$watch('fullCode', () => {
      this.setCodes();
    });

    document.body.addEventListener('click', this.onClickBody);
  },
  beforeUnmount() {
    document.body.removeEventListener('click', this.onClickBody);
  },
  methods: {
    setCodes() {
      if (this.fullCode) {
        const fullCode = String(this.fullCode);
        this.setValuesByCode({
          provinceCode: fullCode.length > 1 ? fullCode.substring(0, 2) : '',
          cityCode: fullCode.length > 3 ? fullCode.substring(0, 4) : '',
          areaCode: fullCode.length > 5 ? fullCode : ''
        });
      }
      this.setDefault();
    },
    /**
     * set value by code or text, check code and text at the same time
     */
    setDefault() {
      if (this.innerProvince) {
        const pro = this.allProvinces.filter((item) => item.name === this.innerProvince);
        if (pro && pro[0]) {
          this.currentProvince = pro[0];
        }
      }
      if (!this.currentProvince && this.innerProvinceCode) {
        const pro = this.allProvinces.filter(
          (item) => item.code + '' === this.innerProvinceCode + ''
        );
        if (pro && pro[0]) {
          this.currentProvince = pro[0];
        }
      }
      this.currentProvince = this.currentProvince || this.allProvinces[0];
      this.currentCities = this.allCityies.filter(
        (item) => item.provinceCode === (this.currentProvince as Province).code
      );

      if (this.innerCity) {
        const city = this.allCityies.filter(
          (item) =>
            item.provinceCode + '' === (this.currentProvince as Province).code + '' &&
            item.name === this.innerCity
        );
        if (city && city[0]) {
          this.currentCity = city[0];
        }
      }
      if (!this.currentCity && this.innerCityCode) {
        const city = this.allCityies.filter(
          (item) =>
            item.provinceCode + '' === (this.currentProvince as Province).code + '' &&
            item.code === this.innerCityCode
        );
        if (city && city[0]) {
          this.currentCity = city[0];
        }
      }
      this.currentCity = this.currentCity || this.currentCities[0];

      this.currentAreas = this.allAreas.filter(
        (item) => item.cityCode === (this.currentCity as City).code
      );

      if (this.innerArea) {
        const area = this.allAreas.filter(
          (item) =>
            item.cityCode + '' === (this.currentCity as City).code + '' &&
            item.name === this.innerArea
        );
        if (area && area[0]) {
          this.currentArea = area[0];
        }
      }
      if (!this.currentArea && this.innerAreaCode) {
        const area = this.allAreas.filter(
          (item) =>
            item.cityCode + '' === (this.currentCity as City).code + '' &&
            item.code === this.innerAreaCode
        );
        if (area && area[0]) {
          this.currentArea = area[0];
        }
      }
      this.currentArea = this.currentArea || this.currentAreas[0];
    },
    /**
     * clear existing values, then set code values in options.
     * @param options
     *  provinceCode: province code
     *  cityCode: city code
     *  areaCode: area code
     */
    setValuesByCode(options: { [key: string]: string }) {
      this.innerProvince = '';
      this.innerCity = '';
      this.innerArea = '';
      this.innerProvinceCode = '';
      this.innerCityCode = '';
      this.innerAreaCode = '';
      if (options.provinceCode) {
        this.innerProvinceCode = options.provinceCode;
      }
      if (options.cityCode) {
        this.innerCityCode = options.cityCode;
      }
      if (options.areaCode) {
        this.innerAreaCode = options.areaCode;
      }
      this.setDefault();
    },
    /**
     * clear existing values, then set text values in options.
     * @param options
     *  province: province name
     *  city: city name
     *  area: area name
     */
    setValuesByName(options: { [key: string]: string }) {
      this.innerProvince = '';
      this.innerCity = '';
      this.innerArea = '';
      this.innerProvinceCode = '';
      this.innerCityCode = '';
      this.innerAreaCode = '';
      if (options.province) {
        this.innerProvince = options.province;
      }
      if (options.city) {
        this.innerCity = options.city;
      }
      if (options.area) {
        this.innerArea = options.area;
      }
      this.setDefault();
    },
    selectProvince(item: Province) {
      this.currentProvince = item;
      this.currentCities = this.allCityies.filter(
        (item) => item.provinceCode === (this.currentProvince as Province).code
      );

      this.currentCity = this.currentCities[0];
      this.currentAreas = this.allAreas.filter(
        (item) => item.cityCode === (this.currentCity as City).code
      );

      this.currentArea = this.currentAreas[0];
    },
    selectCity(item: City) {
      this.currentCity = item;
      this.currentAreas = this.allAreas.filter(
        (item) => item.cityCode === (this.currentCity as City).code
      );

      this.currentArea = this.currentAreas[0];
    },
    selectArea(item: Area) {
      this.currentArea = item;
      if (this.$props.autoClose) {
        this.onConfirm();
      }
    },
    onConfirm() {
      const result = {
        province: this.currentProvince,
        city: this.currentCity,
        area: null as null | Area
      };
      result.area = this.currentArea;
      this.$emit('confirmEvent', result);
      this.displayPopup = false;
    },
    onCancel() {
      this.$emit('cancelEvent');
      this.displayPopup = false;
    },
    updatePosition() {
      setTimeout(() => {
        const slot: HTMLElement = (document.getElementById(this.citySlotId) || {}) as HTMLElement;
        const position: string[] = (String(this.$props.position) || this.getAutoPosition()).split(
          '-'
        );
        this.styles = {
          [position[0] || 'top']: slot.offsetHeight + 3 + 'px',
          [position[1] || 'left']: 0,
          width: this.$props.width || '260px'
        };
      });
    },
    // TODO: calculate the best position
    getAutoPosition(): string {
      return 'top-left';
    },
    onClickSlot() {
      // execute after body click propagation
      if (!this.displayPopup) {
        setTimeout(() => {
          this.displayPopup = true;
        });
      }
    },
    onClickBody() {
      this.displayPopup = false;
    },
    onClickPicker(event: MouseEvent) {
      event.stopPropagation();
    }
  }
});
