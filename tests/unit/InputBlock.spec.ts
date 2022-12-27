import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import InputBlock from '@/components/InputBlock.vue';
import { bases } from '@/utils';


describe('InputBlock.vue', () => {

  const units = bases['Объём'];
  const wrapper = shallowMount(InputBlock, {
    props: { units }
  });

  describe('renders props.units when passed', () => {

    const options = wrapper.findAll('option');

    for (let i = 0; i < units.length; i++) {
      it(`renders unit ${units[i].name}`, () => {
        expect(options[i].text()).to.equal(`${units[i].name}`);
      });
    }

  });

  describe('emits', () => {

    wrapper.vm.$emit('update:unit', 'ok!!!');
    wrapper.vm.$emit('update:unit', 'sdfghjk!!!!!!!!');

    it('emit update:unit', () => {
      expect(wrapper.emitted()['update:unit'].length).to.equal(2);
      expect(wrapper.emitted()['update:unit'][0]).to.deep.equal(['ok!!!']);
      expect(wrapper.emitted()['update:unit'][1]).to.deep.equal(['sdfghjk!!!!!!!!']);
    });

  });
  
});
