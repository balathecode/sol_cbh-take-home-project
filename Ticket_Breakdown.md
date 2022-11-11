# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Note:

- I am assuming that, every facility have their specific data for agent

## Task 1 : Create table facilities_agents and required database indexs

### Description:

- Create table facilities_agents, to store all the required data specific to the facility and agent.

### Acceptance Criteria:

- Create table facilities_agents, with facility_id, agent_id, custom_agent_id, meta_data
- Create index on agent_id
- Create index on custom_agent_id

### Time Estimation:

- 1 day

### Implementation:

- `CREATE TABLE facilities_agents ( facility_id uuid NOT NULL,agent_id uuid NOT NULL,custom_agent_id text,meta_data text)`;
- `CREATE INDEX facilities_agents-agent_id-idx ON facilities_agents using btree(agent_id)`;
- `CREATE INDEX facilities_agents-custom_agent_id-idx ON facilities_agents USING using btree(custom_agent_id)`;

## Task 2 : Facilities API to support custom agent id and metadata

### Description:

- API to support the custom agent id and metadata sepcific to the facility

### Acceptance Criteria:

- Verify the custom_agent_id and metadata at facilities_agents table
- Update the unitests
- Swagger API docs

### Time Estimation:

- 2 days

### Implementation:

- At the facilities API implementation, we will be introducting the functionality to update the facilities_agents table with proper validations.
- Here there are two implementations, one is modifying the exisitng API with feature flags if require, or create new API with next version v2. Based on the existing system, we chose the preferred one.

## Task 3 : Extend the getShiftsByFacility to support custom agent id

### Description:

- Supports both
- - existing flow with agent id
- - and new flow with custom agent id

### Acceptance Criteria:

- Verify the getShiftsByFacility returns the shifts with custom_agent_id by flag = custom_agent_id
- Verify the getShiftsByFacility returns the shifts with custom_agent_id by flag = agent_id
- Update unittests

### Time Estimation:

- 1 day

### Implementation:

- DB Client to query the data from facilities_agents table
- Modify the getShiftsByFacility function to support the custom_agent_id

## Task 4 : Extend the genrateReport to support custom agent id

### Description:

- Supports both
- - existing flow with agent id
- - and new flow with custom agent id

### Acceptance Criteria:

- Verify the generateReport with custom_agent_id
- Verify the generateReport without custom_agent_id
- Update unittests

### Time Estimation:

- 1 day

### Implementation:

- Update the PDF `template variables` to support custom_agent_id
