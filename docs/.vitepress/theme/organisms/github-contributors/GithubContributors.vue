<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useGithubContributors} from "../../composables/api/useGithubContributors";
import ContributorItems from "../../molecules/contributors/ContributorItems.vue";
import type {GitHubUser} from "../../composables/api/interfaces/GithubUser";
import {useThemeConfig} from "../../composables/config/__mocks__/useThemeConfig";

interface Props {
  users?: string[];
  showTitle?: boolean;
  width?: string | number;
  bgColor?: string;
  color?: string;
  blur?: number;
  textSize?: string;
  shadow?: string;
  padding?: string | number;
  innerPadding?: string | number;
  fontWeight?: string;
}

const props = withDefaults(defineProps<Props>(), {
  users: () => [],
  showTitle: false,
  width: 45,
  bgColor: "gray-lighter",
  color: "blue",
  blur: 0,
  textSize: "xxs",
  shadow: "",
  padding: 2,
  innerPadding: 0,
  fontWeight: "400",
  liClass: ""
});

const contributors = ref<GitHubUser[]>([]);
const theme = useThemeConfig();
const {githubProxyUrl} = theme.value;

const {fetchContributors} = useGithubContributors(githubProxyUrl);

onMounted(async () => {
  let fetchedContributorsRef = await fetchContributors();
  let fetchedContributors = fetchedContributorsRef?.value;

  if (fetchedContributors && props.users.length > 0) {
    fetchedContributors = fetchedContributors.filter((contributor) => props.users.includes(contributor.login));
  }

  if (fetchedContributors) {
    contributors.value = fetchedContributors;
  }
});

const {users, ...otherProps} = props;
</script>

<template>
  <ContributorItems v-bind="otherProps" :items="contributors"></ContributorItems>
</template>
