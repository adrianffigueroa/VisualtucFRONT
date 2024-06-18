import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const clientsAdapter = createEntityAdapter({})
const initialState = clientsAdapter.getInitialState()

export const clientsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => '/clients',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedClients = responseData.map((client) => {
          client.id = client._id
          return client
        })
        return clientsAdapter.setAll(initialState, loadedClients)
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: 'Client', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Client', id })),
          ]
        } else return [{ type: 'Client', id: 'LIST' }]
      },
    }),
    addNewClient: builder.mutation({
      query: (initialClientData) => ({
        url: '/clients',
        method: 'POST',
        body: {
          ...initialClientData,
        },
      }),
      invalidatesTags: [{ type: 'Client', id: 'LIST' }],
    }),
    updateClient: builder.mutation({
      query: (initialClientData) => ({
        url: `/clients/${initialClientData.id}`,
        method: 'PATCH',
        body: {
          ...initialClientData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Client', id: arg.id }],
    }),
    deleteClient: builder.mutation({
      query: ({ id }) => ({
        url: `/clients/${id}`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Client', id: arg.id }],
    }),
  }),
})

export const {
  useGetClientsQuery,
  useAddNewClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientsApiSlice

// Returns the query result object
export const selectClientsResult = clientsApiSlice.endpoints.getClients.select()

// Creates memoized selector
const selectClientsData = createSelector(
  selectClientsResult,
  (clientResult) => clientResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with the aliases we precide using destructuring
export const {
  selectAll: selectAllClients,
  selectById: selectClientById,
  selectIds: selectClientIds,
} = clientsAdapter.getSelectors(
  (state) => selectClientsData(state) ?? initialState
)
