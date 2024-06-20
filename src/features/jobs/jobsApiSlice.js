import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const jobsAdapter = createEntityAdapter({
  //aca va la funcion para ordenar los datos
})
const initialState = jobsAdapter.getInitialState()

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => '/jobs',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedJobs = responseData.map((job) => {
          job.id = job._id
          return job
        })
        return jobsAdapter.setAll(initialState, loadedJobs)
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: 'Job', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Job', id })),
          ]
        } else return [{ type: 'Job', id: 'LIST' }]
      },
    }),
    addNewJob: builder.mutation({
      query: (initialJobData) => ({
        url: '/jobs',
        method: 'POST',
        body: {
          ...initialJobData,
        },
      }),
      invalidatesTags: [{ type: 'Job', id: 'LIST' }],
    }),
    updateJob: builder.mutation({
      query: (initialJobData) => ({
        url: `/jobs/${initialJobData.id}`,
        method: 'PATCH',
        body: {
          ...initialJobData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Job', id: arg.id }],
    }),
    deleteJob: builder.mutation({
      query: ({ id }) => ({
        url: `/jobs/${id}`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Job', id: arg.id }],
    }),
  }),
})

export const {
  useGetJobsQuery,
  useAddNewJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobsApiSlice

// Returns the query result object
export const selectJobsResult = jobsApiSlice.endpoints.getJobs.select()

// Creates memoized selector
const selectJobsData = createSelector(
  selectJobsResult,
  (jobResult) => jobResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with the aliases we precide using destructuring
export const {
  selectAll: selectAllJobs,
  selectById: selectJobById,
  selectIds: selectJobIds,
} = jobsAdapter.getSelectors((state) => selectJobsData(state) ?? initialState)
