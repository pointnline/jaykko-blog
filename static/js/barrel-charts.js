document.addEventListener('DOMContentLoaded', function() {
  var COLORS = {
    gold: '#c9a84c',
    red: '#e74c3c',
    blue: '#3498db',
    green: '#27ae60',
    purple: '#8b5cf6',
    orange: '#f39c12',
    cyan: '#4ecdc4',
    text: '#aaa',
    grid: 'rgba(255,255,255,0.06)'
  };

  // WTI 유가 차트
  var wrap1 = document.getElementById('chart-price-wrap');
  if (wrap1 && typeof Chart !== 'undefined') {
    var cvs1 = document.createElement('canvas');
    wrap1.appendChild(cvs1);

    var years = [];
    for (var y = 1970; y <= 2026; y++) years.push(y);

    var wtiData = [
      3.39,3.60,3.60,4.75,9.35,12.21,13.10,14.40,14.95,31.61,
      37.42,35.75,31.83,29.08,28.75,26.92,14.44,17.75,14.87,18.33,
      23.19,20.20,19.25,16.75,15.66,16.75,20.46,19.09,11.91,16.56,
      27.39,23.00,22.81,27.69,37.66,50.04,58.30,64.20,91.48,53.48,
      71.21,87.04,86.46,91.17,85.60,43.73,36.34,48.66,57.36,51.56,
      36.76,65.17,94.53,77.61,75.89,68.50,72.00
    ];

    var annotations = {
      line1: { type:'line', xMin:3, xMax:3, borderColor:COLORS.red, borderWidth:2, borderDash:[4,4],
        label:{ display:true, content:'1973 OPEC', position:'start', color:COLORS.red, font:{size:10} }},
      line2: { type:'line', xMin:9, xMax:9, borderColor:COLORS.orange, borderWidth:2, borderDash:[4,4],
        label:{ display:true, content:'1979 이란', position:'start', color:COLORS.orange, font:{size:10} }},
      line3: { type:'line', xMin:20, xMax:20, borderColor:COLORS.purple, borderWidth:2, borderDash:[4,4],
        label:{ display:true, content:'1990 걸프', position:'start', color:COLORS.purple, font:{size:10} }},
      line4: { type:'line', xMin:38, xMax:38, borderColor:COLORS.cyan, borderWidth:2, borderDash:[4,4],
        label:{ display:true, content:'2008 리먼', position:'start', color:COLORS.cyan, font:{size:10} }},
      line5: { type:'line', xMin:44, xMax:44, borderColor:COLORS.blue, borderWidth:2, borderDash:[4,4],
        label:{ display:true, content:'2014 셰일', position:'start', color:COLORS.blue, font:{size:10} }},
      line6: { type:'line', xMin:50, xMax:50, borderColor:COLORS.green, borderWidth:2, borderDash:[4,4],
        label:{ display:true, content:'2020 코로나', position:'start', color:COLORS.green, font:{size:10} }},
      line7: { type:'line', xMin:52, xMax:52, borderColor:'#ff6b6b', borderWidth:2, borderDash:[4,4],
        label:{ display:true, content:'2022 러-우', position:'start', color:'#ff6b6b', font:{size:10} }},
      line8: { type:'line', xMin:56, xMax:56, borderColor:COLORS.gold, borderWidth:2, borderDash:[4,4],
        label:{ display:true, content:'2026 카타르', position:'start', color:COLORS.gold, font:{size:10} }}
    };

    new Chart(cvs1, {
      type: 'line',
      data: {
        labels: years,
        datasets: [{
          label: 'WTI 유가 ($/배럴)',
          data: wtiData,
          borderColor: COLORS.gold,
          backgroundColor: 'rgba(201,168,76,0.1)',
          fill: true,
          tension: 0.3,
          pointRadius: 0,
          borderWidth: 2.5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          annotation: { annotations: annotations },
          title: {
            display: true,
            text: 'WTI 원유 가격 추이 (1970-2026)',
            color: COLORS.text,
            font: { size: 14, family: "'Noto Sans KR', sans-serif" }
          }
        },
        scales: {
          x: { ticks: { color: COLORS.text, maxTicksLimit: 12 }, grid: { color: COLORS.grid } },
          y: { ticks: { color: COLORS.text, callback: function(v) { return '$'+v; } }, grid: { color: COLORS.grid },
            title: { display: true, text: '$/배럴', color: COLORS.text } }
        }
      }
    });
  }

  // 에너지 쇼크별 자산 영향 비교 차트
  var wrap2 = document.getElementById('chart-impact-wrap');
  if (wrap2 && typeof Chart !== 'undefined') {
    var cvs2 = document.createElement('canvas');
    wrap2.appendChild(cvs2);

    new Chart(cvs2, {
      type: 'bar',
      data: {
        labels: ['1973\nOPEC', '1979\n이란', '1990\n걸프', '2008\n리먼', '2014\n셰일', '2020\n코로나', '2022\n러-우', '2026\n카타르'],
        datasets: [
          {
            label: '유가 변동(%)',
            data: [300, 179, 141, -78, -74, -65, 67, 122],
            backgroundColor: COLORS.gold,
            borderRadius: 4
          },
          {
            label: 'S&P 500(%)',
            data: [-17, -13, -20, -57, -5, -34, -25, -8],
            backgroundColor: COLORS.blue,
            borderRadius: 4
          },
          {
            label: '금(Gold)(%)',
            data: [97, 126, 8, 5, -2, 25, -1, 18],
            backgroundColor: COLORS.orange,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: '에너지 쇼크별 자산 영향 비교',
            color: COLORS.text,
            font: { size: 14, family: "'Noto Sans KR', sans-serif" }
          },
          legend: { labels: { color: COLORS.text } }
        },
        scales: {
          x: { ticks: { color: COLORS.text, font: { size: 10 } }, grid: { color: COLORS.grid } },
          y: { ticks: { color: COLORS.text, callback: function(v) { return v+'%'; } }, grid: { color: COLORS.grid },
            title: { display: true, text: '변동률 (%)', color: COLORS.text } }
        }
      }
    });
  }

  // 타임라인
  var ctx3 = document.getElementById('chart-timeline');
  if (ctx3) {
    var events = [
      { year: 1973, label: 'OPEC 금수', price: '$3→$12', color: COLORS.red },
      { year: 1979, label: '이란 혁명', price: '$14→$39', color: COLORS.orange },
      { year: 1990, label: '걸프전', price: '$17→$41', color: COLORS.purple },
      { year: 2000, label: '슈퍼사이클', price: '$20→$147', color: COLORS.cyan },
      { year: 2008, label: '리먼 폭락', price: '$147→$32', color: COLORS.blue },
      { year: 2014, label: '셰일 혁명', price: '$100→$26', color: COLORS.green },
      { year: 2020, label: '마이너스 유가', price: '-$37.63', color: '#ff6b6b' },
      { year: 2022, label: '러-우 전쟁', price: '$78→$130', color: '#e056a0' },
      { year: 2026, label: '카타르 위기', price: '$9→$20+', color: COLORS.gold }
    ];

    var html = '<div style="overflow-x:auto; padding:16px 0;">';
    html += '<div style="display:flex; align-items:center; min-width:900px; gap:0; position:relative; padding:40px 20px 60px;">';
    html += '<div style="position:absolute; top:50%; left:20px; right:20px; height:2px; background:rgba(255,255,255,0.15);"></div>';

    for (var i = 0; i < events.length; i++) {
      var e = events[i];
      var isTop = i % 2 === 0;
      var pos = isTop ? 'bottom:55%' : 'top:55%';
      html += '<div style="flex:1; text-align:center; position:relative;">';
      html += '<div style="position:absolute; top:50%; left:50%; width:12px; height:12px; border-radius:50%; background:' + e.color + '; transform:translate(-50%,-50%); z-index:2; box-shadow:0 0 8px ' + e.color + '50;"></div>';
      html += '<div style="position:absolute; ' + pos + '; left:50%; transform:translateX(-50%); text-align:center; white-space:nowrap;">';
      html += '<div style="font-size:0.7rem; color:' + e.color + '; font-weight:700;">' + e.year + '</div>';
      html += '<div style="font-size:0.75rem; color:#ddd; font-weight:600;">' + e.label + '</div>';
      html += '<div style="font-size:0.65rem; color:#888; font-family:JetBrains Mono,monospace;">' + e.price + '</div>';
      html += '</div></div>';
    }

    html += '</div></div>';
    ctx3.innerHTML = html;
  }
});
