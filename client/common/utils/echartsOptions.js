const commonBarOption = () => {
    return {
        title: {
            // text: '前区各数值出现频率'
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            // data: dataAxis,
            // axisLabel: {
            //     inside: true,
            //     color: "#fff"
            // },
            // z: 10
        },
        yAxis: {},
        series: [{
            name: '出现次数',
            type: 'bar',
            // data: data
        }]
    };
};

const commonPieOption = () => {
    return {
        legend: {
            show: false,
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                name: '大乐透饼图分析',
                type: 'pie',
                radius: [20, 100],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                // data: [
                //     { value: 40, name: 'rose 1' },
                //     { value: 38, name: 'rose 2' },
                //     { value: 32, name: 'rose 3' },
                //     { value: 30, name: 'rose 4' },
                //     { value: 28, name: 'rose 5' },
                //     { value: 26, name: 'rose 6' },
                //     { value: 22, name: 'rose 7' },
                //     { value: 18, name: 'rose 8' }
                // ]
            }
        ]
    };
};

export {
    commonBarOption,
    commonPieOption
};