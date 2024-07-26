declare module 'react-native-highcharts' {
    import Highcharts from 'highcharts';
  
    interface HighchartsReactNativeProps {
      highcharts: typeof Highcharts;
      options: Highcharts.Options;
    }
  
    export default class HighchartsReactNative extends React.Component<HighchartsReactNativeProps> {}
  }
  