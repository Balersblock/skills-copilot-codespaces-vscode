function skillsMember() {
  const member = this;
  console.log(`${member.name} has the following skills:`);
  member.skills.forEach(skill => {
    console.log(skill);
  });
}