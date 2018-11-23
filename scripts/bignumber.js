console.log(bnPublicationsArrays.publicationsDepartments);
$('.valuepublications').text(bnPublicationsArrays.publicationsDepartments[1].all_the_time_publications);
var ddd = bnPublicationsArrays.publicationsDepartments.filter(function data() {
    data.department_codes == 'AUG';
});
console.log(ddd);