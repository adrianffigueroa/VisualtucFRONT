﻿import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const usersAdapter = createEntityAdapter({})
const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id
          return user
        })
        return usersAdapter.setAll(initialState, loadedUsers)
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [{ type: 'User', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'User', id }))]
        } else return [{ type: 'User', id: 'LIST' }]
      },
    }),
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: '/users/createNewUser',
        method: 'POST',
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: `/users/updateUser/${initialUserData.id}`,
        method: 'PATCH',
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: (resutl, error, arg) => [{ type: 'User', id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users/deleteUser/${id}`,
        method: 'DELETE',
        body: {
          id,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
    }),
  }),
})

export const { useGetUsersQuery, useAddNewUserMutation, useUpdateUserMutation, useDeleteUserMutation } = usersApiSlice

// Returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

// Creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (userResult) => userResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with the aliases we precide using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState)
