const path = require('path');
// node의 경로 설정을 돕는 도구
const webpack = require('webpack');
const refresh = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {

    name: 'common-setting', // 설정의 이름
    mode : 'development', // 개발용, 만약 실서비스용이면 : 'production'
    devtool : 'eval', // 빠르게 하겠다는 의미
    resolve : {
        extensions : ['.js', '.jsx'], // 자동으로 js와 jsx 파일을 찾아서 연결해준다.
    },
    entry : {
        app: ['./client'],

    }, // 입력 부분
    module : {
        rules : [{
            test: /\.jsx?/,
            loader : 'babel-loader',
            options : {
                presets: [
                    ['@babel/preset-env',{
                        targets : {
                            browsers: ['> 5% in KR','last 2 chrome versions']
                        }
                    }],
                    '@babel/preset-react'
                ],
            plugins :[
                '@babel/plugin-proposal-class-properties',
                'react-refresh/babel',
            ],
            },
        }],
    }, // 모듈 입력
    plugins:[
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new refresh()
    ],
    output : {
        path : path.join(__dirname, 'dist'), // 현재 폴더 안의 dist 폴더를 말한다.
        filename : 'app.js',
        publicPath: '/dist',
    }, // 출력 부분
    devServer: {
        devMiddleware: {
            publicPath : '/dist'
        },
        static:{
            directory : path.resolve(__dirname)
        },
        hot : true,
    },
};