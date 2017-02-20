<template id="notifierList">
	<div class="notifications">
		<h1>Notifications</h1>
		<div class="actions">
			<select v-model="connection">
				<option v-for="current in connections">{{ current }}</option>
			</select>
		</div>
		<table cellspacing="0" cellpadding="0">
			<thead>
				<tr>
					<td>Id</td>
					<td>Created</td>
					<td>Type</td>
					<td>Severity</td>
					<td>Message</td>
					<td>Context</td>
					<td>Code</td>
				</tr>
			</thead>
	
			<tbody>
				<tr v-for="notification in notifications">
					<td><a href="javascript:void(0)" @click="show(notification)">{{ notification.id }}</a></td>
					<td>{{ notification.created | formatDateTime }}</td>
					<td>{{ notification.type }}</td>
					<td>{{ notification.severity }}</td>
					<td>{{ notification.message }}</td>
					<td>{{ notification.context }}</td>
					<td>{{ notification.code }}</td>
				</tr>
				
				<tfoot>
					<td colspan="7"><button :disabled="lowestId == null" @click="loadMore(connection)">Load More</button></td>
				</tfoot>
			</tbody>		
		</table>
		
		<div class="notification" v-if="notification != null" @keyup.esc="notification = null">
			<div class="actions">
				<button @click="notification = null">Close</button>
			</div>
			<pre v-if="notification.description">{{ notification.description }}</pre>
			<div v-for="property in properties">
				<span class="key">{{ property.key }}</span>
				<span class="value">{{ property.value }}</span>
			</div>
		</div>
	</div>
</template>