require.config({
    paths: {
        'swiper': './libs/swiper',
        'scroll': './libs/bscroll.min',
        'jquery': './libs/jquery'
    }
});
require(['scroll', 'swiper', 'jquery'], function(scroll, Swiper, $) {

    var uls = document.querySelector('.uls');
    var swiper = new Swiper('.swiper-container', {
        loop: true,
        direction: "horizontal",
        // autoplay: {
        //     delay: 2000,
        // },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        }
    });
    var scrolls = new scroll('.show', {
        click: true
    })

    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(data) {
            if (data.code == 1) {
                round(data.data);
            }
        }
    });

    function round(arr) {
        var sum = 0;
        var html = ``;

        for (var i = 0; i < arr.length; i += 2) {
            console.log(sum)
            if (sum < arr.length) {
                html += ` <div>
                <dl>
                    <dt><img src="./img/${arr[sum].src}" alt=""></dt>
                    <dd>
                        <h5>${arr[sum].name}</h5>
                        <p class="p1">规格：${arr[sum].max}</p>
                         <p class="p2">￥${arr[sum].money}</p>
                    </dd>
                </dl>`;
                if (sum + 1 < arr.length) {
                    html += ` <dl>
                    <dt><img src="./img/${arr[sum+1].src}" alt=""></dt>
                    <dd>
                        <h5>${arr[sum+1].name}</h5>
                        <p class="p1">规格：${arr[sum+1].max}</p>
                         <p class="p2">￥${arr[sum+1].money}</p>
                    </dd>
                </dl></div>`;
                    sum += 2;
                } else {
                    html += `</div>`;
                }

            }
        }
        uls.innerHTML = html;
    }
});