import React, { useState, useEffect } from 'react';
import { useQuery } from 'wasp/client/operations';
import { getFeedbackForAdmin } from 'wasp/client/operations';
//import DefaultLayout from '../../layout/DefaultLayout';
import { useAuth } from 'wasp/client/auth';
import { useRedirectHomeUnlessUserIsAdmin } from '../../useRedirectHomeUnlessUserIsAdmin';
import { type AuthUser } from 'wasp/auth';
import { GetFeedbackResult } from "./queries"; // Import the return type
import { type Feedback } from 'wasp/entities';


interface DashboardProps {
    user: AuthUser;
}

const ViewFeedback = ({ user }: DashboardProps) => {
  useRedirectHomeUnlessUserIsAdmin({ user });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Explicitly type the data variable using type assertion
  const { data, isLoading, error } = useQuery(getFeedbackForAdmin, { page, pageSize }) as { data: GetFeedbackResult | undefined; isLoading: boolean; error: any };

  const totalPages = data ? Math.ceil(data.totalCount / pageSize) : 0;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  if (isLoading) {
    return (
     
        <div>Loading feedback...</div>

    );
  }

  if (error) {
    return (
      
        <div>Error loading feedback: {error.message}</div>
    
    );
  }

  if (!data) {
    return (
     
        <div>No feedback found.</div>

    );
  }

  return (

      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Feedback for Admins</h1>

        {data.feedback.map((feedback) => (
          <div key={feedback.id} className="mb-4 p-4 border rounded shadow-md">
            <p className="text-gray-700">{feedback.content}</p>
            <p className="text-gray-500 text-sm mt-2">Created at: {feedback.createdAt.toLocaleString()}</p>
          </div>
        ))}
        <div className="flex justify-center mt-4">
          <label htmlFor="pageSize" className="mr-2">
            Page Size:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded mr-2"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded ml-2"
          >
            Next
          </button>
        </div>
      </div>

  );
};

export default ViewFeedback;