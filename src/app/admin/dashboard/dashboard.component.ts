import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { CardContent } from './cardContent';
import { AdminService } from '../services/admin.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  constructor(private dashboardService: AdminService) { }
  color: String = "red";
  getRandomColor() {
    let randColors = ["purple", "blue", "green", "orange", "red"];
    return randColors[Math.round((Math.random() * 1000)) % 5];
  }

 

  cards: CardContent[] = [];
  ngOnInit() {
    this.color = this.getRandomColor();
    this.cards = [];
    this.loadCardContents(1, 'Surveys');
    this.loadCardContents(2, 'Users');
    this.loadCardContents(3, 'Active');
    this.loadCardContents(4, 'Completed');
    this.getLineChartData();
    this.getBarChartData();
    this.getPieChartData();

  }

  loadCardContents(index, cardDetail: string) {
    this.dashboardService.getCardHeaderData(cardDetail)
      .subscribe(
        data => {
          if (data == undefined || data == null) {
          } else {
            this.cards.push(new CardContent(index, data.label, data.value, data.cardType, data.footerText));
          }
        })
  }

  lineChartData: any = { labels: [], series: [] }
  getLineChartData() {
    this.dashboardService.getChartData('line','progress')
      .subscribe(
        data => {
          if (data == undefined || data == null) {
          } else {
            this.lineChartData = data;
            this.lineChartData.labels = data.labels;
            this.lineChartData.series = [];
            this.lineChartData.series.push(data.data);

            const optionsLineChart: any = {
              lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
              }),

              low: 0,
              high: 100,
              chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
            }
            var lineChart = new Chartist.Line('#lineChart', this.lineChartData, optionsLineChart);
            this.startAnimationForLineChart(lineChart);
          };
        })
  }

  barChartData: any = { labels: [], series: [] }
  getBarChartData() {
    this.dashboardService.getChartData('bar','weekly progress')
      .subscribe(
        data => {
          if (data == undefined || data == null) {
          } else {
            this.barChartData = data;
            this.barChartData.labels = data.labels;
            this.barChartData.series = [];
            this.barChartData.series.push(data.data);

            var optionBarChart = {
              axisX: {
                showGrid: false
              },
              low: 0,
              high: 100,
              chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
            };

            var responsiveOptions: any[] = [
              ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                  labelInterpolationFnc: function (value) {
                    return value[0];
                  }
                }
              }]
            ];
            var barChart = new Chartist.Bar('#barChart', this.barChartData, optionBarChart, responsiveOptions);
            this.startAnimationForBarChart(barChart);
          };
        })
  }

  pieChartData: any = { labels: [], series: [] }
  getPieChartData() {
    var colorss:["#333", "#222", "#111", "#FFF"];//,"#333", "#222", "#111", "#000","#333", "#222", "#111", "#000","#333", "#222", "#111", "#000"];
    this.dashboardService.getChartData('pie', 'completion status')
      .subscribe(
        data => {
          if (data == undefined || data == null) {
          } else {
            this.pieChartData = data;
            //alert(data.data)
            var x=[29,34,27,231,12];
            var sum = function (a, b) { return a + b };
            var chartdata = {
              series:x
            };
            /*new Chartist.Pie('#pieChart',{
              series: data.data
            },
             {
              
  showLabel: true});*/
  Chartist.Pie('#pieChart', {
    //labels: ['project A', 'project B', 'project C', 'project D'],
    series: [40, 30, 55, 22, 33,12,124]
  }, {
    showLabel: true
  });
          }
        })
  }
  getMax(data) {
    let max = 5;
    for (let i = 0; i < data.length; i++) {
      if (data[i] > max) { max = data[i] };
    }
    return max;
  }
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });

      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });
    seq = 0;
  };

  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;

    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };

}