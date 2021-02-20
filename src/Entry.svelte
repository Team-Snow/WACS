<script lang="ts">
    export let taskName: string;
    export let timesServed: number;
    export let timesCompleted: number;
    export let leadingSolution: string;
</script>

<tr>
    <td>{taskName}</td>
    <td>{timesServed}</td>
    <td>{timesCompleted}</td>
    <td>{leadingSolution}</td>
</tr>

