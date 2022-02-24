import { ScreenType } from '~/shared/navigation';
import * as Home from '~/home/screens';

export const initialScreen = Home.HomeScreen.route;

export const screens: ScreenType[] = [...Object.values(Home)];
