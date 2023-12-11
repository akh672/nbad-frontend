import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Paper from '@mui/material/Paper';
import { Bar, Pie } from 'react-chartjs-2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import './HomePage.css';
import Navbar from '../Navbar';
// import faker from 'faker';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);








const HomePage = (props) => {

  const [budgetValue, setBudgetValue] = useState(0);
  const [totalExpenseValue, setExpenseValue] = useState(0);
  const [doubleBarLabels, setDoubleBarLabels] = useState([]);
  const [expensesForBarGraph, setExpensesForBarGraph] = useState([]);
  const [budgetForBarGraph, setBudgetForBarGraph] = useState([]);
  const [catagoriesNameArray, setCatalogNameArray] = useState([]);
  const [catagoryAmountArray, setCatalogAmountArray] = useState([]);
  const [amountPerCatagory, setAmountPerCatagory] = useState([])
  const {
    getBudgetData,
    budgetsData,
    getAllExpensesAndDate,
    expensesData,
    barChartExpnesesData,
  } = props;
  let labels = [];

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        await getBudgetData();
        await getAllExpensesAndDate();
      }
      catch (er) {
        alert('Something went Wrong', er.message);
      }
    }
    fetchBudgetData();
  }, [])

  useEffect(() => {
    if (budgetsData && Object.keys(budgetsData).length > 0) {
      const {
        categories,
        totalAmount,
      } = budgetsData;
      // debugger
      let result = {};
      categories.forEach(category => {
        result[category.name] = result[category.name] ? result[category.name] + category.allocatedAmount : category.allocatedAmount;
      });
      console.log(result)
      setAmountPerCatagory(result);
      let categoriesValueCont = 0;
      let budgetAmount = [];
      let budgetNameArray = [];
      categories.map((budget) => {
        budgetAmount.push(budget.allocatedAmount);
        budgetNameArray.push(budget.name)
      });
      setCatalogAmountArray(budgetAmount);
      setCatalogNameArray(budgetNameArray);
      setBudgetValue(totalAmount);

    }
  }, [budgetsData]);

  useEffect(() => {
    let dateArray = [];
    let amountSpentArray = [];
if(budgetsData && Object.keys(budgetsData).length > 0){
  const {
    categories,
    totalAmount,
  } = budgetsData;
  const sortedData = barChartExpnesesData.sort((a, b) => new Date(a.date) - new Date(b.date));

  let decrementArrayBudget = [];
  let budgetLeft = totalAmount;
  let expensesDone = 0;
  sortedData.map((exp) => {
    dateArray.push(exp.date);
    decrementArrayBudget.push(budgetLeft - exp.totalAmountSpent)
    budgetLeft -= exp.totalAmountSpent;
    expensesDone += exp.totalAmountSpent;
    amountSpentArray.push(exp.totalAmountSpent);
  });
  console.log(amountSpentArray, decrementArrayBudget)
  setExpenseValue(expensesDone)
  setBudgetForBarGraph(decrementArrayBudget)
  setDoubleBarLabels(dateArray);
  setExpensesForBarGraph(amountSpentArray);
}

  }, [barChartExpnesesData]);


  return (<>
    <div className="masterDashBoardContainer">
      <Navbar title={'Dashboard'} />
      <div className="upperDashboardContainer">
        <Paper elevation={3} className="verticalChartContainer">
          <div className="headerForBoxes">EXPENSES and BUDGET LEFT Vs DATE</div>
          <Bar options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              // title: {
              //   display: true,
              //   text: 'Chart.js Bar Chart',
              // },
            },
            scales: {
              y: {
                beginAtZero: true,
                suggestedMax: Math.max([...expensesForBarGraph, ...budgetForBarGraph]) + 100,
              },
            },
          }} data={{
            labels: doubleBarLabels,
            datasets: [
              {
                label: 'Expenses',
                data: expensesForBarGraph,
                backgroundColor: '#fa6166',
              },
              {
                label: 'Budget Left',
                data: budgetForBarGraph,
                backgroundColor: '#f1b92c',
              },
            ],
          }} />
        </Paper>
        <Paper elevation={3} className='totaExpensesVsIncomeAmountperMonth'>
          <div className="headerForBoxes">TOTAL EXPENSES / TOTAL BUDGET</div>

          <div className="incomExpanceDividerContainer">
            <div className='fractionLabel'>
              Expenses: <span className='fractionValue'>{totalExpenseValue}</span>
            </div>
            <div className="hrCont">
              <hr />
            </div>
            <div className='fractionLabel'>
              Budget: <span className='fractionValue incomeFraction'>{budgetValue}</span>
            </div>
          </div>
        </Paper>
      </div>
      <div className="downDashboardContainer">
        <Paper elevation={3} className='pieChartContainer'>
          <div className="headerForBoxes">EXPENSES Per BUDGET CATAGORY</div>
          <Pie
            data={{
              labels: Object.keys(amountPerCatagory),
              datasets: [
                {
                  label: '# of Votes',
                  data: Object.values(amountPerCatagory),
                  backgroundColor: [
                    '#f1b92c',
                    '#fa6166',
                    '#4065cc',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              tooltips: {
                enabled: true,
              },
              plugins: {
                datalabels: {
                  display: true,
                },
                htmlLegend: {
                  // ID of the container to put the legend in
                  containerID: 'legend-container',
                },
                legend: {
                  display: true,
                  position: 'right'
                }
              },
              hover: {
                animationDuration: 0,
              },
              animation: {
                animateScale: true,
                animateRotate: true,
                easing: 'easeInOutCirc',
              },
            }}
          />
        </Paper>
        <Paper elevation={3} className='lineChartContainer'>
          <div className="headerForBoxes">AMOUNT Vs CATAGORIES</div>
          <Bar options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                suggestedMax: Math.max([...catagoryAmountArray]) + 100,
              },
            },
          }} data={{
            labels: catagoriesNameArray,
            datasets: [
              {
                label: 'Budget per Catagory',
                data: catagoryAmountArray,
                backgroundColor: '#4065cc',
              },
            ],
          }} />
        </Paper>
      </div>
    </div>
  </>)
}

export default HomePage;