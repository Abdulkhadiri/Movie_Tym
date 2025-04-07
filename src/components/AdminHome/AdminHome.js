import React, { useEffect, useState } from "react";
import VendorForm from "./VendorForm";
import VendorList from "./VendorList";
import "./AdminHome.css";
import axios from "axios";
import { Line } from "react-chartjs-2"; // Changed from Bar to Line
import NavigationArrows from '../../components/Booking/NavigationArrows';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement, // Added for Line chart
  LineElement,  // Added for Line chart
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement, // Added for Line chart
  LineElement,  // Added for Line chart
  Title,
  Tooltip,
  Legend
);

function AdminHome() {
  const [vendors, setVendors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [chartData, setChartData] = useState(null);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/graph`
      );
      setChartData(response.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  const fetchVendors = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/display_vendors`
      );
      setVendors(response.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  useEffect(() => {
    fetchVendors();
    fetchAnalytics();
  }, []);

  const options = (title) => ({
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
        font: { size: 16 }
      },
      legend: {
        position: 'top',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Registrations'
        }
      }
    }
  });

  const renderCharts = () => {
    if (!chartData) return <div>Loading charts...</div>;

    const monthlyLabels = chartData.monthly.labels;
    const monthlyCustomerData = chartData.monthly.datasets[0].data;
    const monthlyTheaterOwnerData = chartData.monthly.datasets[1].data;

    const yearlyLabels = chartData.yearly.labels;
    const yearlyCustomerData = chartData.yearly.datasets[0].data;
    const yearlyTheaterOwnerData = chartData.yearly.datasets[1].data;

    // const prepareCustomerMonthlyData = () => ({
    //   labels: monthlyLabels,
    //   datasets: [{
    //     label: 'Customer Monthly Registrations',
    //     data: monthlyCustomerData,
    //     backgroundColor: 'rgba(75, 192, 192, 0.6)',
    //     borderColor: 'rgb(75, 192, 192)',
    //     borderWidth: 1
    //   }]
    // });

    // const prepareTheaterOwnerMonthlyData = () => ({
    //   labels: monthlyLabels,
    //   datasets: [{
    //     label: 'Theater Owner Monthly Registrations',
    //     data: monthlyTheaterOwnerData,
    //     backgroundColor: 'rgba(255, 99, 132, 0.6)',
    //     borderColor: 'rgb(255, 99, 132)',
    //     borderWidth: 1
    //   }]
    // });

    // const prepareCustomerYearlyData = () => ({
    //   labels: yearlyLabels,
    //   datasets: [{
    //     label: 'Customer Yearly Registrations',
    //     data: yearlyCustomerData,
    //     backgroundColor: 'rgba(75, 192, 192, 0.6)',
    //     borderColor: 'rgb(75, 192, 192)',
    //     borderWidth: 1
    //   }]
    // });

    // const prepareTheaterOwnerYearlyData = () => ({
    //   labels: yearlyLabels,
    //   datasets: [{
    //     label: 'Theater Owner Yearly Registrations',
    //     data: yearlyTheaterOwnerData,
    //     backgroundColor: 'rgba(255, 99, 132, 0.6)',
    //     borderColor: 'rgb(255, 99, 132)',
    //     borderWidth: 1
    //   }]
    // });

    // return (
    //   <div className="charts-container">
    //     <h2 className="section-title">Customer Statistics</h2>
    //     <div className="charts-grid">
    //       <div className="chart-wrapper">
    //         <Bar 
    //           data={prepareCustomerMonthlyData()} 
    //           options={options('Customer Monthly Registrations')}
    //         />
    //       </div>
    //       <div className="chart-wrapper">
    //         <Bar 
    //           data={prepareCustomerYearlyData()} 
    //           options={options('Customer Yearly Registrations')}
    //         />
    //       </div>
    //     </div>

    //     <h2 className="section-title">Theater Owner Statistics</h2>
    //     <div className="charts-grid">
    //       <div className="chart-wrapper">
    //         <Bar 
    //           data={prepareTheaterOwnerMonthlyData()} 
    //           options={options('Theater Owner Monthly Registrations')}
    //         />
    //       </div>
    //       <div className="chart-wrapper">
    //         <Bar 
    //           data={prepareTheaterOwnerYearlyData()} 
    //           options={options('Theater Owner Yearly Registrations')}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // );
    const prepareCustomerMonthlyData = () => ({
      labels: monthlyLabels,
      datasets: [{
        label: 'Customer Monthly Registrations',
        data: monthlyCustomerData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3, // Adds curve to the line
        fill: true    // Fills area under the line
      }]
    });
    
    const prepareTheaterOwnerMonthlyData = () => ({
      labels: monthlyLabels,
      datasets: [{
        label: 'Theater Owner Monthly Registrations',
        data: monthlyTheaterOwnerData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
        fill: true
      }]
    });
    
    const prepareCustomerYearlyData = () => ({
      labels: yearlyLabels,
      datasets: [{
        label: 'Customer Yearly Registrations',
        data: yearlyCustomerData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
        fill: true
      }]
    });
    
    const prepareTheaterOwnerYearlyData = () => ({
      labels: yearlyLabels,
      datasets: [{
        label: 'Theater Owner Yearly Registrations',
        data: yearlyTheaterOwnerData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
        fill: true
      }]
    });
    return (
      <div className="charts-container">
        <NavigationArrows prevPath={'/home'}/>
        <h2 className="section-title">Customer Statistics</h2>
        <div className="charts-grid">
          <div className="chart-wrapper">
            <Line 
              data={prepareCustomerMonthlyData()} 
              options={options('Customer Monthly Registrations')}
            />
          </div>
          <div className="chart-wrapper">
            <Line 
              data={prepareCustomerYearlyData()} 
              options={options('Customer Yearly Registrations')}
            />
          </div>
        </div>
    
        <h2 className="section-title">Theater Owner Statistics</h2>
        <div className="charts-grid">
          <div className="chart-wrapper">
            <Line 
              data={prepareTheaterOwnerMonthlyData()} 
              options={options('Theater Owner Monthly Registrations')}
            />
          </div>
          <div className="chart-wrapper">
            <Line 
              data={prepareTheaterOwnerYearlyData()} 
              options={options('Theater Owner Yearly Registrations')}
            />
          </div>
        </div>
      </div>
    );
  };

  const handleAddVendor = async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/add_vendor`,
        formData
      );

      if (response.status === 200) {
        await fetchVendors();
        setShowForm(false);
      } else {
        console.error("Failed to add vendor:", response);
      }
    } catch (error) {
      console.error("Error adding vendor:", error);
    }
  };

  const handleDeleteVendor = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/admin/delete_vendor/${id}`
      );
      await fetchVendors();
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  return (
    <div className="admin-home">
      <div className="admin-header">
        <h1>Vendor Management</h1>
        <button
          className="add-vendor-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Back to Vendor List" : "Add New Vendor"}
        </button>
      </div>

      {showForm ? (
        <VendorForm
          onAddVendor={handleAddVendor}
          refreshVendors={fetchVendors}
        />
      ) : (
        <div className="list">
          <VendorList
            vendors={vendors}
            refreshVendors={fetchVendors}
            onDeleteVendor={handleDeleteVendor}
          />
          {renderCharts()}
        </div>
      )}
    </div>
  );
}

export default AdminHome;
