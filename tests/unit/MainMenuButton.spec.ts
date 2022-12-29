import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import MainMenuButton from '@/components/MainMenuButton.vue';


describe('MainMenuButton.vue', () => {
  const title = 'Кнопка';
  const isActive = true;
  const wrapper = shallowMount(MainMenuButton, {
    props: { title, isActive }
  });

  it('renders props.title', () => {
    expect(wrapper.text()).to.equal(title);
  });

  it('renders props.isActive', () => {
    expect(wrapper.classes('bg-green-400')).to.be.true;
    expect(wrapper.classes('dark:bg-white')).to.be.true;
    expect(wrapper.classes('text-white')).to.be.true;
    expect(wrapper.classes('dark:text-green-400')).to.be.true;
  });

});
