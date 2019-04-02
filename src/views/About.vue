<template>
  <v-container>
    <v-timeline>
    <v-timeline-item
      v-for="(version, i) in versions"
      :key="i"
      :color="version.color"
      small
    >
      <template v-slot:opposite>
        <span
          :class="`headline font-weight-bold ${version.color}--text`"
          v-text="version.time"
        ></span>
      </template>
      <div class="py-3">
        <h2 :class="`headline font-weight-light mb-3 ${version.color}--text`">Team: {{version.teamName}}</h2>
        <h2 :class="`font-weight-light mb-3 indigo--text`">{{version.teamLeader}}</h2>
        <h2 :class="`font-weight-light mb-3 indigo--text`">{{version.teamMember}}</h2>
        <h3 :class="'font-weight-light mb-2'" v-for="spec in version.specification" :key="spec">
          {{spec}}
        </h3>
        <h3 :class="'font-weight-light mb-2'"><a :href="version.link">{{version.link}}</a></h3>
      </div>
    </v-timeline-item>
  </v-timeline>
  <v-card>

  </v-card>
  </v-container>
  
</template>
<script>
  export default {
    data: () => ({
      versions: [
        {
          color: 'cyan',
          time: '2018-09 ~ 2019-12',
          teamName:'Bits&Bytes',
          teamLeader: 'Team Leader: Christopher Labelle',
          teamMember: 'Members: Liangliang Du, Melissa Rajala, Zhan Shen, Xia Sheng, Bin Yang',
          specification: [
            "Front-end: JSP, JavaScript ES5",
            "Back-end: Servlet, Java 8",
            "Database: MySQL 5.7",
            "Version Control: Git"
          ],
          link: "https://github.com/LilianDu/AHometoShare"
        },
        {
          color: 'green',
          time: '2019-01 ~ 2019-04',
          teamName:'WithYou',
          teamLeader: 'Architect: Peng Li. Team Leader: Boskovic Milos',
          teamMember: "QA: Chen Huang. Members: Jiang Nan, Wang Oroi Sod",
          specification: [
            "Front-end: Thymeleaf 2.1.2, JavaScript ES6, JQuery 3.3, VueJS 2.0, Vuetify 1.5.6, Vue2-editor 2.6.6",
            "Back-end: Spring-boot 2.0, Java 8",
            "Permission Control: Shiro 1.4",
            "Persistence Layer: MyBatis 2.0",
            "Database: MySQL 8.0",
            "Project Management: Gradle",
            "Log: logback 1.2.3",
            "Version Control: Git"
          ],
          link: "https://github.com/praylee/ahometoshare_v2"
        }
      ]
    })
  }
</script>