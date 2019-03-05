<template>
    

<b-container fluid>
    <b-row>
    <b-col cols="4" id="search-area">
        <div>
        <b-navbar type="light" variant="light">
            <label>Search here:</label>
            <b-input id="search" type="text" placeholder="Search" v-model="search"></b-input>
        </b-navbar>
        </div>
        <hr>
        <div>
        <b-form-checkbox v-model="email">Email</b-form-checkbox>
        <b-form-checkbox v-model="name">Name</b-form-checkbox>
        <b-form-checkbox v-model="phone">Phone</b-form-checkbox>
        <b-form-checkbox v-model="address">Address</b-form-checkbox>
        <b-form-checkbox v-model="age">Age</b-form-checkbox>
        <b-form-select v-model="gender" :options="genderOptions" class="narrowbox"></b-form-select>
        </div>
        <hr>
        <div>This search box will serach on any selected column above. If none of them are selected, it will search on all columns.</div>                 
    </b-col>
    <b-col cols="8">
        <b-row>
        <b-col>
            <div class="narrowbox">
            <b-form-select v-model="perpage" :options="perpageOptions" class="mb-3"></b-form-select>
            </div>
        </b-col>
        <b-col>
            <div>
            Total matched records: {{filteredHosts.length}}
            </div>
        </b-col>
        <b-col>
            <b-pagination size="md" align="right" :total-rows="totalPages" v-model="currentPage" :per-page="perpage"></b-pagination>
        </b-col>
        </b-row>
        
        <b-table 
        :outlined="true"
        :hover="true"
        :items="filteredHosts"
        :fields="fields"
        :per-page="perpage"
        :current-page="currentPage">
        </b-table>
    </b-col>
    </b-row>
</b-container>
</template>