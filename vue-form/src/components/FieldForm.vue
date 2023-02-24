<template>    
    <label class="label has-text-left pl-1" :for="tag">{{ labelName }}</label>
    <div class="control has-icons-left">
        <input class="input" :name="tag" :id="tag" :type="inputType" :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" @blur="$emit('blur')" :placeholder="inputPlaceholder" v-maska :data-maska="maskType" :disabled="isDisabled">
        <span class="icon is-small is-left">
            <i :class="inputIcon"></i>
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { vMaska } from "maska";

export default defineComponent({
    name: 'FieldForm',
    directives: { maska: vMaska },
    emits: ['update:modelValue', 'blur'],  
    props: {
        labelName: String,
        tag: String,
        inputType: String,
        inputPlaceholder: String,
        inputIcon: String,
        modelValue: String,
        maskType: String,
        isDisabled: Boolean   
    },    
})
</script>