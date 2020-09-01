import { create } from '@storybook/theming/create';
import logo from '../assets/logo.svg';

export default create({
    base: 'light',
    brandTitle: 'RevoGrid',
    brandUrl: 'http://revolist.eu',
    brandImage: logo,

    appBg: '#FDFDFD',
    appBorderRadius: 8,
    appBorderColor: '#F3F3F3',
});