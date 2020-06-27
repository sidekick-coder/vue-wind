## Simple usage

```vue
<template>
    <div>
        <w-data-table :headers="headers" :items="items"></w-data-table>
    </div>
</template>

<script>
export default {
    data(){
        return  {
            headers: [
                {
                    name: "Customer fisrt name",
                    value: "first_name"
                },
                {
                    name: "Customer last name",
                    value: "last_name"
                },
            ],
            items: [
                {
                    first_name: "Jonh",
                    last_name: "Walker"
                }
            ],
        }
    },
}
</script>
```

## Item slot

```vue
<template>
    <div>
        <w-data-table :headers="headers" :items="items">
          <template v-slot:item.first_name="{ item }">
                {{ item.first_name.toUpperCase() }}
          </template>  
        </w-data-table>
    </div>
</template>

<script>
export default {
    data(){
        return  {
            headers: [
                {
                    name: "Customer fisrt name",
                    value: "first_name"
                },
                {
                    name: "Customer last name",
                    value: "last_name"
                },
            ],
            items: [
                {
                    first_name: "Jonh",
                    last_name: "Walker"
                }
            ],
        }
    },
}
</script>
```
