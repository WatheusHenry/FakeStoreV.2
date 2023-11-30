package br.org.ciag.fakestore.domain;

import static br.org.ciag.fakestore.domain.CategoryTestSamples.*;
import static br.org.ciag.fakestore.domain.ProductTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import br.org.ciag.fakestore.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ProductTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Product.class);
        Product product1 = getProductSample1();
        Product product2 = new Product();
        assertThat(product1).isNotEqualTo(product2);

        product2.setId(product1.getId());
        assertThat(product1).isEqualTo(product2);

        product2 = getProductSample2();
        assertThat(product1).isNotEqualTo(product2);
    }

    @Test
    void categoriesTest() throws Exception {
        Product product = getProductRandomSampleGenerator();
        Category categoryBack = getCategoryRandomSampleGenerator();

        product.addCategories(categoryBack);
        assertThat(product.getCategories()).containsOnly(categoryBack);

        product.removeCategories(categoryBack);
        assertThat(product.getCategories()).doesNotContain(categoryBack);

        product.categories(new HashSet<>(Set.of(categoryBack)));
        assertThat(product.getCategories()).containsOnly(categoryBack);

        product.setCategories(new HashSet<>());
        assertThat(product.getCategories()).doesNotContain(categoryBack);
    }
}
